/**
 * WebGL library
 * author jeff zhong
 * date 2017/12/29
 * version 1.0
 */
;(function() {
    /**
     * webgl采用的是右手坐标系
     * z正值表示该对象是在屏幕/观众近，而z的负值表示该对象远离屏幕 
     */

    //是否将扩展加入到上下文
    const defaults = {
        addExtensionsToContext: true,
    };

    const glEnumToString = (function() {
        const haveEnumsForType = {};
        const enums = {};
      
        function addEnums(gl) {
          const type = gl.constructor.name;
          if (!haveEnumsForType[type]) {
            for (const key in gl) {
              if (typeof gl[key] === 'number') {
                const existing = enums[gl[key]];
                enums[gl[key]] = existing ? `${existing} | ${key}` : key;
              }
            }
            haveEnumsForType[type] = true;
          }
        }
      
        return function glEnumToString(gl, value) {
          addEnums(gl);
          return enums[value] || ("0x" + value.toString(16));
        };
      }());

    const prefixRE = /^(.*?)_/;
    function addExtensionToContext(gl, extensionName) {
        glEnumToString(gl, 0);
        const ext = gl.getExtension(extensionName);
        if (ext) {
            const enums = {};
            const fnSuffix = prefixRE.exec(extensionName)[1];
            const enumSuffix = '_' + fnSuffix;
            for (const key in ext) {
                const value = ext[key];
                const isFunc = typeof (value) === 'function';
                const suffix = isFunc ? fnSuffix : enumSuffix;
                let name = key;
                // examples of where this is not true are WEBGL_compressed_texture_s3tc
                // and WEBGL_compressed_texture_pvrtc
                if (key.endsWith(suffix)) {
                    name = key.substring(0, key.length - suffix.length);
                }
                if (gl[name] !== undefined) {
                    if (!isFunc && gl[name] !== value) {
                        helper.warn(name, gl[name], value, key);
                    }
                } else {
                    if (isFunc) {
                        gl[name] = function(origFn) {
                            return function() {
                                return origFn.apply(ext, arguments);
                            };
                        }(value);
                    } else {
                        gl[name] = value;
                        enums[name] = value;
                    }
                }
            }
            // pass the modified enums to glEnumToString
            enums.constructor = {
                name: ext.constructor.name,
            };
            glEnumToString(enums, 0);
        }
        return ext;
    }

    //扩展列表
    const supportedExtensions = [
        'ANGLE_instanced_arrays',
        'EXT_blend_minmax',
        'EXT_color_buffer_float',
        'EXT_color_buffer_half_float',
        'EXT_disjoint_timer_query',
        'EXT_disjoint_timer_query_webgl2',
        'EXT_frag_depth',
        'EXT_sRGB',
        'EXT_shader_texture_lod',
        'EXT_texture_filter_anisotropic',
        'OES_element_index_uint',
        'OES_standard_derivatives',
        'OES_texture_float',
        'OES_texture_float_linear',
        'OES_texture_half_float',
        'OES_texture_half_float_linear',
        'OES_vertex_array_object',
        'WEBGL_color_buffer_float',
        'WEBGL_compressed_texture_atc',
        'WEBGL_compressed_texture_etc1',
        'WEBGL_compressed_texture_pvrtc',
        'WEBGL_compressed_texture_s3tc',
        'WEBGL_compressed_texture_s3tc_srgb',
        'WEBGL_depth_texture',
        'WEBGL_draw_buffers',
    ];

    function addExtensionsToContext(gl) {
        for (let ii = 0; ii < supportedExtensions.length; ++ii) {
            addExtensionToContext(gl, supportedExtensions[ii]);
        }
    }

    
    /**
     * 获取webgl1上下文
     */
    function get3DContext(canvas, opt) {
        const names = ["webgl", "experimental-webgl"];
        let context = null;
        for (let i = 0, len = names.length; i < len; i++) {
            context = canvas.getContext(names[i], opt);
            if (context) {
              if (defaults.addExtensionsToContext) {
                addExtensionsToContext(context);
              }
              break;
            }
        }
        return context;
    }

    /**
     * Creates a webgl context.
     * Will return a WebGL2 context if possible.
     * @param {HTMLCanvasElement} canvas 
     * @return {WebGLRenderingContext} The created context.
     */
    function createContext(canvas, opt) {
        const names = ["webgl2", "webgl", "experimental-webgl"];
        let context = null;
        for (let i = 0; i < names.length; ++i) {
        context = canvas.getContext(names[i], opt);
            if (context) {
                if (defaults.addExtensionsToContext) {
                    addExtensionsToContext(context);
                }
                break;
            }
        }
        return context;
    }

    /**
     * 根据script id创建program
     * 参数形式(gl,[vid,sid],true)/(gl,vid,sid,true)
     * @param  {Object}        gl          context
     * @param  {Array/String}  ids         script id
     * @return {Object} 
     */
    function createProgramByScript(gl,...args) {
        const shaders = getShaderString(args);
        if (!shaders.length) return null;
        return  createProgramBySource(gl, shaders);
    }

    /**
     * 根据htmlelement的id获取着色器代码字符串
     * 参数形式:(['vid','fid']) 或 ('fid','vid')
     * @param  {String/Array} vid/fid script id
     * @return {Array}
     */
    function getShaderString(...args) {
        let ids = [], vshader, fshader, element;

        String(args).replace(new RegExp('[^\\,\\s]+', 'g'), function(item) {
            if (item) { ids.push(item); }
        });

        ids.forEach(function(id) {
            element = document.getElementById(id);
            if(element.type.indexOf("vert") >= 0){// 顶点着色器
                vshader = element.text;
            } else if(element.type.indexOf("frag") >= 0){// 片段着色器
                fshader = element.text;
            }
        });
        if (!vshader) {
            console.log('VERTEX_SHADER String not exist');
            return [];
        }
        if (!fshader) {
            console.log('FRAGMENT_SHADER String not exist');
            return [];
        }
        return [vshader, fshader];
    }

    /**
     * 创建连接程序对象
     * @param  {Object} gl      上下文
     * @param  {Array} shaders  着色器代码
     * @return {Object}         
     */
    function createProgramBySource(gl, ...shaders) {
        if(Array.isArray(shaders[0])) { shaders = shaders[0]; }//传的是数组
        // 创建着色器对象
        const vertexShader = loadShader(gl, gl.VERTEX_SHADER, shaders[0]);
        const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, shaders[1]);
        if (!vertexShader || !fragmentShader) {
            return null;
        }

        // 创建程序对象
        const program = gl.createProgram();
        if (!program) {
            return null;
        }

        // 为程序对象分配着色器
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);

        // 连接程序对象
        gl.linkProgram(program);

        // 检查连接结果
        const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!linked) {
            const error = gl.getProgramInfoLog(program);
            console.log('Failed to link program: ' + error);
            gl.deleteProgram(program);
            gl.deleteShader(fragmentShader);
            gl.deleteShader(vertexShader);
            return null;
        }
        return program;
    }

    /**
     * 加载着色器
     * @param  {Object} gl     上下文
     * @param  {Object} type   类型
     * @param  {String} source 代码字符串
     * @return {Object}       
     */
    function loadShader(gl, type, source) {
        // 创建着色器对象
        const shader = gl.createShader(type);
        if (!shader) {
            console.log('unable to create shader');
            return null;
        }

        // 向着色器程序填充代码
        gl.shaderSource(shader, source);

        // 编译着色器
        gl.compileShader(shader);

        // 检查编译结果
        const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!compiled) {
            const error = gl.getShaderInfoLog(shader);
            console.log('Failed to compile shader: ' + error);
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    /**
     * 创建程序对象
     * @param  {Object} gl            
     * @param  {Array}  shaders 着色器id或字符串
     * @return {Object}               
     */
    function createProgramInfo(gl, ...shaders) {
        // Lets assume if there is no \n it's an id
        if(Array.isArray(shaders[0])) { shaders = shaders[0]; }//传的是数组
        const program = shaders[0].indexOf('\n') > 0 ? createProgramBySource(gl, shaders) : createProgramByScript(gl, shaders);
        const uniformSetters = createUniformSetters(gl, program);
        const attribSetters = createAttributeSetters(gl, program);
        return {
            program: program,
            uniformSetters: uniformSetters,
            attribSetters: attribSetters,
        };
    }

    /**
     * 绑定缓冲区,设置attributes
     */
    function setBuffersAndAttributes(gl, programInfo, buffers) {
        //支持VAO的情况
        if (buffers.vertexArrayObject) {
            gl.bindVertexArray(buffers.vertexArrayObject);
        } else {
            setAttributes(programInfo.attribSetters || programInfo, buffers.attribs);
            if (buffers.indices) {
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
            }
        }
    }

    /**
     * 给program 的 attributes 创建设置方法
     */
    function createAttributeSetters(gl, program) {
        var attribSetters = {},
            numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
        for (var i = 0; i < numAttribs; ++i) {
            var attribInfo = gl.getActiveAttrib(program, i);
            if (!attribInfo) {
                break;
            }
            var index = gl.getAttribLocation(program, attribInfo.name);
            attribSetters[attribInfo.name] = createAttribSetter(index);
        }
        /**
         * 绑定缓冲区,输出数据
         */
        function createAttribSetter(index) {
            return function(b) {
                gl.bindBuffer(gl.ARRAY_BUFFER, b.buffer);
                gl.enableVertexAttribArray(index);
                gl.vertexAttribPointer(index, b.num || b.size, b.type || gl.FLOAT, b.normalize || false, b.stride || 0, b.offset || 0);
            };
        }

        return attribSetters;
    }

    /**
     * 绑定缓冲区,设置attributes
     * Properties of attribs. For each attrib you can add
     * properties:
     *   type: the type of data in the buffer. Default = gl.FLOAT
     *   normalize: whether or not to normalize the data. Default = false
     *   stride: the stride. Default = 0
     *   offset: offset into the buffer. Default = 0
     *
     * For example if you had 3 value float positions, 2 value
     * float texcoord and 4 value uint8 colors you'd setup your attribs like this
     *
     *     var attribs = {
     *       a_position: {buffer: positionBuffer, num: 3},
     *       a_texcoord: {buffer: texcoordBuffer, num: 2},
     *       a_color: {
     *         buffer: colorBuffer,
     *         num: 4,
     *         type: gl.UNSIGNED_BYTE,
     *         normalize: true,
     *       },
     *     };
     */
    function setAttributes(setters, attribs) {
        setters = setters.attribSetters || setters;
        Object.keys(attribs).forEach(function(name) {
            var setter = setters[name];
            if (setter) {
                setter(attribs[name]);
            }
        });
    }

    /**
     * 给program 的 uniforms 创建设置方法
     */
    function createUniformSetters(gl, program) {
        var textureUnit = 0,
            uniformSetters = {},
            numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

        for (var ii = 0; ii < numUniforms; ++ii) {
            var uniformInfo = gl.getActiveUniform(program, ii);
            if (!uniformInfo) {
                break;
            }
            var name = uniformInfo.name;
            // remove the array suffix.
            if (name.substr(-3) === "[0]") {
                name = name.substr(0, name.length - 3);
            }
            var setter = createUniformSetter(program, uniformInfo);
            uniformSetters[name] = setter;
        }

        function createUniformSetter(program, uniformInfo) {
            var location = gl.getUniformLocation(program, uniformInfo.name);
            var type = uniformInfo.type;
            // Check if this uniform is an array
            var isArray = (uniformInfo.size > 1 && uniformInfo.name.substr(-3) === "[0]");
            if (type === gl.FLOAT && isArray) {
                return function(v) {
                    gl.uniform1fv(location, v);
                };
            }
            if (type === gl.FLOAT) {
                return function(v) {
                    gl.uniform1f(location, v);
                };
            }
            if (type === gl.FLOAT_VEC2) {
                return function(v) {
                    gl.uniform2fv(location, v);
                };
            }
            if (type === gl.FLOAT_VEC3) {
                return function(v) {
                    gl.uniform3fv(location, v);
                };
            }
            if (type === gl.FLOAT_VEC4) {
                return function(v) {
                    gl.uniform4fv(location, v);
                };
            }
            if (type === gl.INT && isArray) {
                return function(v) {
                    gl.uniform1iv(location, v);
                };
            }
            if (type === gl.INT) {
                return function(v) {
                    gl.uniform1i(location, v);
                };
            }
            if (type === gl.INT_VEC2) {
                return function(v) {
                    gl.uniform2iv(location, v);
                };
            }
            if (type === gl.INT_VEC3) {
                return function(v) {
                    gl.uniform3iv(location, v);
                };
            }
            if (type === gl.INT_VEC4) {
                return function(v) {
                    gl.uniform4iv(location, v);
                };
            }
            if (type === gl.BOOL) {
                return function(v) {
                    gl.uniform1iv(location, v);
                };
            }
            if (type === gl.BOOL_VEC2) {
                return function(v) {
                    gl.uniform2iv(location, v);
                };
            }
            if (type === gl.BOOL_VEC3) {
                return function(v) {
                    gl.uniform3iv(location, v);
                };
            }
            if (type === gl.BOOL_VEC4) {
                return function(v) {
                    gl.uniform4iv(location, v);
                };
            }
            if (type === gl.FLOAT_MAT2) {
                return function(v) {
                    gl.uniformMatrix2fv(location, false, v);
                };
            }
            if (type === gl.FLOAT_MAT3) {
                return function(v) {
                    gl.uniformMatrix3fv(location, false, v);
                };
            }
            if (type === gl.FLOAT_MAT4) {
                return function(v) {
                    gl.uniformMatrix4fv(location, false, v);
                };
            }
            if ((type === gl.SAMPLER_2D || type === gl.SAMPLER_CUBE) && isArray) {
                var units = [];
                for (var ii = 0; ii < info.size; ++ii) {
                    units.push(textureUnit++);
                }
                return function(bindPoint, units) {
                    return function(textures) {
                        gl.uniform1iv(location, units);
                        textures.forEach(function(texture, index) {
                            gl.activeTexture(gl.TEXTURE0 + units[index]);
                            gl.bindTexture(bindPoint, texture);
                        });
                    };
                }(getBindPointForSamplerType(gl, type), units);
            }
            if (type === gl.SAMPLER_2D || type === gl.SAMPLER_CUBE) {
                return function(bindPoint, unit) {
                    return function(texture) {
                        gl.uniform1i(location, unit);
                        // gl.activeTexture(gl.TEXTURE0);
                        // gl.bindTexture(bindPoint, texture);
                    };
                }(getBindPointForSamplerType(gl, type), textureUnit++);
            }
            throw ("unknown type: 0x" + type.toString(16)); // we should never get here.
        }
        return uniformSetters;
    }

    /**
     * 绑定缓冲区,设置uniforms
     *
     * example:
     *     var programInfo = createProgramInfo(
     *         gl, ["some-vs", "some-fs");
     *
     *     var tex1 = gl.createTexture();
     *     var tex2 = gl.createTexture();
     *
     *     var uniforms = {
     *       u_someSampler: tex1,
     *       u_someOtherSampler: tex2,
     *       u_someColor: [1,0,0,1],
     *       u_somePosition: [0,1,1],
     *       u_someMatrix: [
     *         1,0,0,0,
     *         0,1,0,0,
     *         0,0,1,0,
     *         0,0,0,0,
     *       ],
     *     };
     *
     *     gl.useProgram(program);
     *     setUniforms(programInfo.uniformSetters, uniforms);
     */
    function setUniforms(setters, values) {
        setters = setters.uniformSetters || setters;
        Object.keys(values).forEach(function(name) {
            var setter = setters[name];
            if (setter) {
                setter(values[name]);
            }
        });
    }

    /**
     * 根据数组创建缓冲区信息对象(attribute的维度)
     * Given an object like
     *
     *     var arrays = {
     *       position: { num: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
     *       texcoord: { num: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
     *       normal:   { num: 3, data: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],     },
     *       indices:  { num: 3, data: [0, 1, 2, 1, 2, 3],                       },
     *     };
     *
     *  Creates an BufferInfo like this
     *
     *     bufferInfo = {
     *       indexType:gl.UNSIGNED_BYTE,
     *       count: 4,        // or whatever the number of elements is
     *       indices: WebGLBuffer,  // this property will not exist if there are no indices
     *       attribs: {
     *         a_position: { buffer: WebGLBuffer, num: 3, },
     *         a_normal:   { buffer: WebGLBuffer, num: 3, },
     *         a_texcoord: { buffer: WebGLBuffer, num: 2, },
     *       },
     *     };
     *
     *  The properties of arrays can be JavaScript arrays in which case the number of components
     *  will be guessed.
     *
     *     var arrays = {
     *        position: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0],
     *        texcoord: [0, 0, 0, 1, 1, 0, 1, 1],
     *        normal:   [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
     *        indices:  [0, 1, 2, 1, 2, 3],
     *     };
     *
     *  They can also by TypedArrays
     *
     *     var arrays = {
     *        position: new Float32Array([0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0]),
     *        texcoord: new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]),
     *        normal:   new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]),
     *        indices:  new Uint16Array([0, 1, 2, 1, 2, 3]),
     *     };
     *
     */
    function createBufferInfoFromArrays(gl, arrays, opt_mapping) {
        var bufferInfo = {
            attribs: createAttribsFromArrays(gl, arrays, opt_mapping),
        };
        var indices = arrays.indices;
        if (indices) {
            indices = makeTypedArray(indices, "indices");
            bufferInfo.indices = createBufferFromTypedArray(gl, indices, gl.ELEMENT_ARRAY_BUFFER);
            bufferInfo.count = indices.length;
            bufferInfo.indexType = getGLTypeForTypedArray(gl,indices);
        } else {
            bufferInfo.count = getNumElementsFromNonIndexedArrays(arrays);
        }

        return bufferInfo;
    }

    /**
     * 根据数组创建缓冲区对象(buffer的维度)
     *  {
     *    position: { buffer: WebGLBuffer, num: 3, },
     *    normal:   { buffer: WebGLBuffer, num: 3, },
     *    texcoord: { buffer: WebGLBuffer, num: 2, },
     *    indices : { buffer...}
     *    count: 100,
     *  }
     */
    function createBuffersFromArrays(gl, arrays) {
        var buffers = {};
        Object.keys(arrays).forEach(function(key) {
            var type = key === "indices" ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER;
            var array = makeTypedArray(arrays[key], key);
            buffers[key] = createBufferFromTypedArray(gl, array, type);
        });

        if (arrays.indices) {
            buffers.count = arrays.indices.length;
        } else if (arrays.position) {
            buffers.count = arrays.position.length / 3;
        }
        return buffers;
    }

    /**
     * 根据数组创建attributes信息
     * {
     *   a_position: { buffer: WebGLBuffer, num: 3, type:.. },
     *   a_normal:   { buffer: WebGLBuffer, num: 3, type:..},
     *   a_texcoord: { buffer: WebGLBuffer, num: 2, type:..},
     * }
     */
    function createAttribsFromArrays(gl, arrays, opt_mapping) {
        var mapping = opt_mapping || createMapping(arrays);
        var attribs = {};
        Object.keys(mapping).forEach(function(attribName) {
            var bufferName = mapping[attribName];
            var array = makeTypedArray(arrays[bufferName], bufferName);
            attribs[attribName] = {
                buffer: createBufferFromTypedArray(gl, array),
                num: array.num || guessNumFromName(bufferName),
                type: getGLTypeForTypedArray(gl, array),
                normalize: getNormalizationForTypedArray(array),
            };
        });
        return attribs;
    }

    /**
     * Creates a VertexArrayInfo from a BufferInfo and one or more ProgramInfos
     *
     * > **IMPORTANT:** Vertex Array Objects are **not** a direct analog for a BufferInfo. Vertex Array Objects
     *   assign buffers to specific attributes at creation time. That means they can only be used with programs
     *   who's attributes use the same attribute locations for the same purposes.
     *
     * > Bind your attribute locations by passing an array of attribute names to {createProgramInfo}
     *   or use WebGL 2's GLSL ES 3's `layout(location = <num>)` to make sure locations match.
     * also
     * > **IMPORTANT:** After calling setBuffersAndAttribute with a BufferInfo that uses a Vertex Array Object
     *   that Vertex Array Object will be bound. That means **ANY MANIPULATION OF ELEMENT_ARRAY_BUFFER or ATTRIBUTES**
     *   will affect the Vertex Array Object state.
     *
     * > Call `gl.bindVertexArray(null)` to get back manipulating the global attributes and ELEMENT_ARRAY_BUFFER.
     *
     * @param {WebGLRenderingContext} gl A WebGLRenderingContext
     * @param {ProgramInfo[]} programInfo a programInfo or array of programInfos
     * @param {BufferInfo} bufferInfo BufferInfo as returned from createBufferInfoFromArrays etc...
     */
    function createVertexArrayInfo(gl, programInfos, bufferInfo) {
        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        if (!programInfos.length) {
            programInfos = [programInfos];
        }
        programInfos.forEach(function(programInfo) {
            setBuffersAndAttributes(gl, programInfo, bufferInfo);
        });
        gl.bindVertexArray(null);
        return {
            count: bufferInfo.count,
            indexType: bufferInfo.indexType,
            vertexArrayObject: vao,
        };
    }

    /**
     * Creates a vertex array object and then sets the attributes on it
     * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
     * @param {Object<string, function>} setters Attribute setters as returned from createAttributeSetters
     * @param {Object<string, .AttribInfo>} attribs AttribInfos mapped by attribute name.
     * @param {WebGLBuffer} [indices] an optional ELEMENT_ARRAY_BUFFER of indices
     */
    function createVAOAndSetAttributes(gl, setters, attribs, indices) {
        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        setAttributes(setters, attribs);
        if (indices) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices);
        }
        // We unbind this because otherwise any change to ELEMENT_ARRAY_BUFFER
        // like when creating buffers for other stuff will mess up this VAO's binding
        gl.bindVertexArray(null);
        return vao;
    }

    /**
     * Creates a vertex array object and then sets the attributes
     * @param {WebGLRenderingContext} gl The WebGLRenderingContext
     * @param {ProgramInfo} programInfo as returned from createProgramInfo or Attribute setters as returned from createAttributeSetters
     * @param {BufferInfo} bufferInfo BufferInfo as returned from createBufferInfoFromArrays etc...
     * @param {WebGLBuffer} [indices] an optional ELEMENT_ARRAY_BUFFER of indices
     * @memberOf module:twgl/vertexArrays
     */
    function createVAOFromBufferInfo(gl, programInfo, bufferInfo) {
        return createVAOAndSetAttributes(gl, programInfo.attribSetters || programInfo, bufferInfo.attribs, bufferInfo.indices);
    }

    /**
     *  创建attribute的名称映射
     */
    function createMapping(obj) {
        var mapping = {};
        Object.keys(obj).filter(allButIndices).forEach(function(key) {
            mapping["a_" + key] = key;
        });
        return mapping;
    }

    /**
     * 排除索引
     */
    function allButIndices(name) {
        return name !== "indices";
    }

    /**
     * 创建类型化数组
     */
    function makeTypedArray(array, name) {
        if (isArrayBuffer(array)) {
            return array;
        }

        if (Array.isArray(array)) {
            array = {
                data: array,
            };
        }

        if (!array.num) {
            array.num = guessNumFromName(name, array.length);
        }

        var type = array.type;
        if (!type) {
            if (name === "indices") {
                type = Uint16Array;
            }
        }
        var typedArray = createAugmentedTypedArray(array.num, array.data.length / array.num | 0, type);
        typedArray.push(array.data);
        return typedArray;
    }

    function createAugmentedTypedArray(num, count, opt_type) {
        var Type = opt_type || Float32Array;
        return augmentTypedArray(new Type(num * count), num);
    }

    // Add `push` to a typed array. It just keeps a 'cursor'
    // and allows use to `push` values into the array so we
    // don't have to manually compute offsets
    function augmentTypedArray(typedArray, num) {
        let cursor = 0;
        typedArray.push = function() {
            for (let i = 0; i < arguments.length; ++i) {
                let value = arguments[i];
                if (value instanceof Array || (value.buffer && value.buffer instanceof ArrayBuffer)) {
                    for (let j = 0; j < value.length; ++j) {
                        typedArray[cursor++] = value[j];
                    }
                } else {
                    typedArray[cursor++] = value;
                }
            }
        };
        typedArray.reset = function(opt_index) {
            cursor = opt_index || 0;
        };
        typedArray.num = num;
        Object.defineProperty(typedArray, 'count', {
            get: function() {
                return this.length / this.num | 0;
            },
        });
        return typedArray;
    }


    /**
     * 是否为类型化数组
     */
    function isArrayBuffer(a) {
        return a.buffer && a.buffer instanceof ArrayBuffer;
    }

    /**
     * 根据名字猜测元素个数
     */
    function guessNumFromName(name, length) {
        let num;
        if (name.indexOf("coord") >= 0) {
            num = 2;
        } else if (name.indexOf("color") >= 0) {
            num = 4;
        } else {
            num = 3; // position, normals, indices ...
        }

        if (length % num > 0) {
            throw "can not guess num. You should specify it.";
        }

        return num;
    }

    /**
     * 根据类型化数组创建缓冲区
     */
    function createBufferFromTypedArray(gl, array, type, drawType) {
        type = type || gl.ARRAY_BUFFER;
        const buffer = gl.createBuffer();
        gl.bindBuffer(type, buffer);
        gl.bufferData(type, array, drawType || gl.STATIC_DRAW);
        return buffer;
    }

    /**
     * 根据构造函数获取对应的元素类型
     */
    function getGLTypeForTypedArray(gl, typedArray) {
        if (typedArray instanceof Int8Array) {return gl.BYTE; }
        if (typedArray instanceof Uint8Array) {return gl.UNSIGNED_BYTE; }
        if (typedArray instanceof Int16Array) {return gl.SHORT; }
        if (typedArray instanceof Uint16Array) {return gl.UNSIGNED_SHORT; }
        if (typedArray instanceof Int32Array) {return gl.INT; }
        if (typedArray instanceof Uint32Array) {return gl.UNSIGNED_INT; }
        if (typedArray instanceof Float32Array) {return gl.FLOAT; }
        throw "unsupported typed array type";
    }

    /**
    * Returns the corresponding bind point for a given sampler type
    */
    function getBindPointForSamplerType(gl, type) {
        if (type === gl.SAMPLER_2D) return gl.TEXTURE_2D;
        if (type === gl.SAMPLER_CUBE) return gl.TEXTURE_CUBE_MAP;
        return undefined;
    }

    /**
     * 猜测是否归一化
     */
    function getNormalizationForTypedArray(typedArray) {
        if (typedArray instanceof Int8Array) {return true; }
        if (typedArray instanceof Uint8Array) {return true; }
        return false;
    }

    /**
     * 获取元素个数
     */
    function getNumElementsFromNonIndexedArrays(arrays) {
        const key = Object.keys(arrays)[0];
        const array = arrays[key];
        if(array.count){
            return array.count;
        }
        const num = array.num || guessNumFromName(key, array.length);
        return array.length / num;
    }
    /*
    * @param {WebGLRenderingContext} gl A WebGLRenderingContext
    * @param {BufferInfo} bufferInfo 
    * @param {number} [type] eg (gl.TRIANGLES, gl.LINES, gl.POINTS, gl.TRIANGLE_STRIP, ...). Defaults to `gl.TRIANGLES`
    * @param {number} [count] An optional count. Defaults to bufferInfo.numElements
    * @param {number} [offset] An optional offset. Defaults to 0.
    */
    function drawBufferInfo(gl, bufferInfo, type, count, offset) {
        type = type || gl.TRIANGLES;
        count = count || bufferInfo.count;
        offset = offset || 0;
        const indices = bufferInfo.indices;
        const indexType = bufferInfo.indexType;
        if (indexType || indices) {
            gl.drawElements(type, count, indexType || gl.UNSIGNED_SHORT, offset);
        } else {
            gl.drawArrays(type, offset, count);
        }
    }

    /**
     * 创建帧缓冲区对象  
     * @param  {Object} gl 上下文
     * @return {Object}    
     */
    function createFramebuffer(gl,opt) {
        let framebuffer, texture, depthBuffer;
        const w = opt.w||1024, h = opt.h||1024;
        // 错误处理函数
        const error = function() {
            if (framebuffer) gl.deleteFramebuffer(framebuffer);
            if (texture) gl.deleteTexture(texture);
            if (depthBuffer) gl.deleteRenderbuffer(depthBuffer);
            return null;
        }
    
        // 创建帧缓冲区
        framebuffer = gl.createFramebuffer();
        if (!framebuffer) {
            console.log('Failed to create frame buffer object');
            return error();
        }
    
        // 创建纹理
        texture = gl.createTexture();
        if (!texture) {
            console.log('Failed to create texture object');
            return error();
        }

        // 激活纹理单元,并将纹理对象绑定到该单元
        const unit = gl['TEXTURE' + (opt.unit||0)];
        gl.activeTexture(unit);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        // 设置纹理参数
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);//缩小过滤中(远离镜头)，从纹理坐标附近的纹理取得一个双线性样本 LINEAR(4个样本的平均值)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);//放大过滤中(靠近镜头)，从最靠近纹理坐标的纹理中取得单点样本 NEAREST
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);//s坐标超出 0.0-1.0 范围时的行为: 限定读取纹理的边缘
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);//t坐标超出 0.0-1.0 范围时的行为: 限定读取纹理的边缘
        
        // 创建渲染缓冲区用于保存深度，代替深度缓冲区
        depthBuffer = gl.createRenderbuffer();
        if (!depthBuffer) {
            console.log('Failed to create renderbuffer object');
            return error();
        }
        //绑定渲染缓冲区
        gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
        //设置为深度缓冲区，gl.DEPTH_COMPONENT16 表示渲染缓冲区将代替深度缓冲区；
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, w, h);
    
        // 绑定帧缓冲区
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        // 将纹理连接到颜色对象
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        // 渲染缓冲区连接到深度对象
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);
    
        // 检查帧缓冲区对象
        const e = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        if (gl.FRAMEBUFFER_COMPLETE !== e) {
            console.log('Frame buffer object is incomplete: ' + e.toString());
            return error();
        }
    
        // 解绑帧缓冲区对象
        // gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);

        return framebuffer;
    }

    /**
     * 创建纹理对象
     * @param {Object} gl 
     * @param {Object} opt 
     * @param {Function} callback 
     */
    function createTexture(gl, opt, callback) {
        const texture = gl.createTexture();
        const unit = gl.TEXTURE0 + (opt.unit||0);
        // 激活纹理单元
        gl.activeTexture(unit);
        // 纹理对象绑定到该单元
        gl.bindTexture(gl.TEXTURE_2D, texture);
        // 设置纹理参数
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, opt.min||gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, opt.mag||gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, opt.wrapT||gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, opt.wrapS||gl.REPEAT);
        
        // 图片加载之前立即渲染纹理，先用 1x1 蓝色像素填充纹理
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));

        if(opt.url){
            const image = new Image();
            image.onload = function(){
                let source = image; 
                const format = opt.format||gl.RGBA;
                if(opt.scale && (opt.scale.x != 1 || opt.scale.y != 1)){
                    // 使用 2d canvas 缩放纹理
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    let w = canvas.width = image.width;
                    let h = canvas.height = image.height;
                    let il = opt.scale.x;
                    let jl = opt.scale.y;
                    for(let i = 0; i < il; i++){
                        for(let j=0; j < jl; j++){
                            ctx.drawImage(image, i * w/il, j * h/jl, w/il, h/jl);
                        }
                    }
                    source = canvas;
                }
                /**
                 * 图片加载完后，重新加载到纹理
                 */
                // 再次激活纹理单元
                gl.activeTexture(unit);
                // 反转Y坐标
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
                // 将图像设置到纹理，重新绑定加载
                gl.bindTexture(gl.TEXTURE_2D, texture);
                // 上传图像到纹理
                gl.texImage2D(gl.TEXTURE_2D, 0, format, format, gl.UNSIGNED_BYTE, source);
                //纹理贴图，根据原始图像创建所有的缩小级别，每个子图都是前一级的双线性插值，用于消除锯齿
                gl.generateMipmap(gl.TEXTURE_2D);
                callback && callback(texture, source);
            };
            loadImageCORS(image, opt.url);
        }
        return texture;
    }

    //突破跨域加载图片
    function loadImageCORS(img, url) {
        if ((new URL(url)).origin !== window.location.origin) {
            img.crossOrigin = "";
        }
        img.src = url;
    }
    
    var output = {
        get3DContext: get3DContext,
        createContext: createContext,
        createProgramByScript: createProgramByScript,
        createProgramBySource: createProgramBySource,
        createProgramInfo: createProgramInfo,
        createAttributeSetters: createAttributeSetters,
        createUniformSetters: createUniformSetters,
        setBuffersAndAttributes: setBuffersAndAttributes,
        setUniforms:setUniforms,
        setAttributes: setAttributes,
        createBufferInfoFromArrays: createBufferInfoFromArrays,
        createBuffersFromArrays: createBuffersFromArrays,
        createAttribsFromArrays: createAttribsFromArrays,
        createVAOFromBufferInfo: createVAOFromBufferInfo,
        createVertexArrayInfo: createVertexArrayInfo,
        drawBufferInfo: drawBufferInfo,
        createFramebuffer: createFramebuffer,
        createTexture: createTexture
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports=output;
    } else {
        for(var n in output){
            window[n]=output[n];
        }
    }
}());