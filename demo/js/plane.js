(function(){'use strict';var he=Math.round,ve=Math.sin,be=Math.cos,ge=Math.PI,xe=Math.sqrt;function e(e,t,r){const i=new ye(3);return e&&(i[0]=e),t&&(i[1]=t),r&&(i[2]=r),i}function t(e,t,r){return r=r||new ye(3),r[0]=e[0]-t[0],r[1]=e[1]-t[1],r[2]=e[2]-t[2],r}function r(e,t,r){return r=r||new ye(3),r[0]=e[0]*t,r[1]=e[1]*t,r[2]=e[2]*t,r}function i(e,t,r){r=r||new ye(3);const i=e[2]*t[0]-e[0]*t[2],a=e[0]*t[1]-e[1]*t[0];return r[0]=e[1]*t[2]-e[2]*t[1],r[1]=i,r[2]=a,r}function a(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}function n(e){return xe(e[0]*e[0]+e[1]*e[1]+e[2]*e[2])}function o(e,t){t=t||new ye(3);const r=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=xe(r);return 1e-5<i?(t[0]=e[0]/i,t[1]=e[1]/i,t[2]=e[2]/i):(t[0]=0,t[1]=0,t[2]=0),t}function s(e,t){return t=t||new ye(3),t[0]=e[0],t[1]=e[1],t[2]=e[2],t}function l(e){return e=e||new Ee(16),e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function d(e,t){t=t||new Ee(16);const r=e[0],i=e[1],a=e[2],n=e[3],o=e[4],s=e[5],l=e[6],u=e[7],m=e[8],c=e[9],p=e[10],f=e[11],h=e[12],v=e[13],b=e[14],g=e[15],x=p*g,y=b*f,E=l*g,_=b*u,T=l*f,A=p*u,L=a*g,S=b*n,z=a*f,N=p*n,I=a*u,C=l*n,O=m*v,V=h*c,R=o*v,P=h*s,M=o*c,F=m*s,B=r*v,j=h*i,D=r*c,U=m*i,w=r*s,G=o*i,k=x*s+_*c+T*v-(y*s+E*c+A*v),X=y*i+L*c+N*v-(x*i+S*c+z*v),H=E*i+S*s+I*v-(_*i+L*s+C*v),W=A*i+z*s+C*c-(T*i+N*s+I*c),Y=1/(r*k+o*X+m*H+h*W);return t[0]=Y*k,t[1]=Y*X,t[2]=Y*H,t[3]=Y*W,t[4]=Y*(y*o+E*m+A*h-(x*o+_*m+T*h)),t[5]=Y*(x*r+S*m+z*h-(y*r+L*m+N*h)),t[6]=Y*(_*r+L*o+C*h-(E*r+S*o+I*h)),t[7]=Y*(T*r+N*o+I*m-(A*r+z*o+C*m)),t[8]=Y*(O*u+P*f+M*g-(V*u+R*f+F*g)),t[9]=Y*(V*n+B*f+U*g-(O*n+j*f+D*g)),t[10]=Y*(R*n+j*u+w*g-(P*n+B*u+G*g)),t[11]=Y*(F*n+D*u+G*f-(M*n+U*u+w*f)),t[12]=Y*(R*p+F*b+V*l-(M*b+O*l+P*p)),t[13]=Y*(D*b+O*a+j*p-(B*p+U*b+V*a)),t[14]=Y*(B*l+G*b+P*a-(w*b+R*a+j*l)),t[15]=Y*(w*p+M*a+U*l-(D*l+G*p+F*a)),t}function u(e,t,r){r=r||new Ee(16);const i=e[0],a=e[1],n=e[2],o=e[3],s=e[4],l=e[5],d=e[6],u=e[7],m=e[8],c=e[9],p=e[10],f=e[11],h=e[12],v=e[13],b=e[14],g=e[15],x=t[0],y=t[1],E=t[2],_=t[3],T=t[4],A=t[5],L=t[6],S=t[7],z=t[8],N=t[9],I=t[10],C=t[11],O=t[12],V=t[13],R=t[14],P=t[15];return r[0]=i*x+s*y+m*E+h*_,r[1]=a*x+l*y+c*E+v*_,r[2]=n*x+d*y+p*E+b*_,r[3]=o*x+u*y+f*E+g*_,r[4]=i*T+s*A+m*L+h*S,r[5]=a*T+l*A+c*L+v*S,r[6]=n*T+d*A+p*L+b*S,r[7]=o*T+u*A+f*L+g*S,r[8]=i*z+s*N+m*I+h*C,r[9]=a*z+l*N+c*I+v*C,r[10]=n*z+d*N+p*I+b*C,r[11]=o*z+u*N+f*I+g*C,r[12]=i*O+s*V+m*R+h*P,r[13]=a*O+l*V+c*R+v*P,r[14]=n*O+d*V+p*R+b*P,r[15]=o*O+u*V+f*R+g*P,r}function m(e,t,r,i,a){var n=Math.tan;a=a||new Ee(16);const o=n(.5*ge-.5*e),s=1/(r-i);return a[0]=o/t,a[1]=0,a[2]=0,a[3]=0,a[4]=0,a[5]=o,a[6]=0,a[7]=0,a[8]=0,a[9]=0,a[10]=(r+i)*s,a[11]=-1,a[12]=0,a[13]=0,a[14]=2*(r*i*s),a[15]=0,a}function c(e,r,a,n){n=n||new Ee(16);const s=_e,l=Te,d=Ae;return o(t(e,r,d),d),o(i(a,d,s),s),o(i(d,s,l),l),n[0]=s[0],n[1]=s[1],n[2]=s[2],n[3]=0,n[4]=l[0],n[5]=l[1],n[6]=l[2],n[7]=0,n[8]=d[0],n[9]=d[1],n[10]=d[2],n[11]=0,n[12]=e[0],n[13]=e[1],n[14]=e[2],n[15]=1,n}function p(e,t){t=t||new Ee(16);const r=be(e),i=ve(e);return t[0]=r,t[1]=0,t[2]=-i,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=i,t[9]=0,t[10]=r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function f(e,t,r,i){i=i||new Ee(16);let a=t[0],o=t[1],l=t[2];const d=xe(a*a+o*o+l*l);a/=d,o/=d,l/=d;const n=a*a,u=o*o,m=l*l,p=be(r),c=ve(r),s=1-p,f=n+(1-n)*p,h=a*o*s+l*c,v=a*l*s-o*c,b=a*o*s-l*c,g=u+(1-u)*p,E=o*l*s+a*c,_=a*l*s+o*c,T=o*l*s-a*c,A=m+(1-m)*p,L=e[0],S=e[1],N=e[2],I=e[3],C=e[4],O=e[5],V=e[6],R=e[7],P=e[8],M=e[9],F=e[10],B=e[11];return i[0]=f*L+h*C+v*P,i[1]=f*S+h*O+v*M,i[2]=f*N+h*V+v*F,i[3]=f*I+h*R+v*B,i[4]=b*L+g*C+E*P,i[5]=b*S+g*O+E*M,i[6]=b*N+g*V+E*F,i[7]=b*I+g*R+E*B,i[8]=_*L+T*C+A*P,i[9]=_*S+T*O+A*M,i[10]=_*N+T*V+A*F,i[11]=_*I+T*R+A*B,e!==i&&(i[12]=e[12],i[13]=e[13],i[14]=e[14],i[15]=e[15]),i}function h(t,r,i){i=i||e();const a=r[0],n=r[1],o=r[2],s=a*t[3]+n*t[7]+o*t[11]+t[15];return i[0]=(a*t[0]+n*t[4]+o*t[8]+t[12])/s,i[1]=(a*t[1]+n*t[5]+o*t[9]+t[13])/s,i[2]=(a*t[2]+n*t[6]+o*t[10]+t[14])/s,i}function v(t,r,i){i=i||e();const a=r[0],n=r[1],o=r[2];return i[0]=a*t[0]+n*t[4]+o*t[8],i[1]=a*t[1]+n*t[5]+o*t[9],i[2]=a*t[2]+n*t[6]+o*t[10],i}function b(e,t,r){if(!e)throw new Error("canvas not exist");var i=e.getBoundingClientRect();return{x:(t-i.left)*(e.width/i.width),y:(r-i.top)*(e.height/i.height)}}function g(e,t){var r=Math.floor;t=t||window.devicePixelRatio;var i=e.width,a=e.height,n=r(e.clientWidth*t),o=r(e.clientHeight*t);(i!==n||a!==o)&&(e.width=n,e.height=o,e.style.width=i+"px",e.style.height=a+"px")}function x(e,t){var r="mousewheel";try{document.createEvent("MouseScrollEvents"),r="DOMMouseScroll"}catch(t){}e.addEventListener(r,function(r){if("wheelDelta"in r){var e=r.wheelDelta;window.opera&&10>opera.version()&&(e=-e),r.delta=he(e)/120}else"detail"in r&&(r.wheelDelta=40*-r.detail,r.delta=r.wheelDelta/120);t(r)},!1)}function y(t,i,l,d,u){function m(r){var e=Math.acos,i=b(t,r.clientX,r.clientY),n=2*((A.y>T.y?A.x-i.x:i.x-A.x)/E*ge),l=(A.y-i.y)/_*ge,d=z[1],u=e(a(o(z),o([0,d,0]))),m=p(n);u+l<ge/90&&0<d&&0>l&&(l=ge/180-u),u-l<ge/90&&0>d&&0<l&&(l=u-ge/180);var c=v(p(-ge/2),[z[0],0,z[2]]),g=f(m,c,-l);S=s(h(g,z))}function c(){z=s(S),t.removeEventListener("mouseup",c,!1),t.removeEventListener("mousemove",m,!1),t.removeEventListener("mouseout",c,!1)}if(!t)throw new Error("canvas not exist");u=u||[0,0,0],i=i||[0,5,5],l=l||1,d=d||50;var g,E=t.clientWidth,_=t.clientHeight,T={x:E/2,y:_/2},A=T,L=1,S=i,z=i;return x(t,function(t){var e=n(z);e<l+1&&0>t.delta||e>d-1&&0<t.delta||(L+=.05*t.delta,S=r(z,L),clearTimeout(g),g=setTimeout(function(){L=1,z=s(S)},20))}),t.addEventListener("mousedown",function(r){A=b(t,r.clientX,r.clientY),t.addEventListener("mousemove",m,!1),t.addEventListener("mouseup",c,!1),t.addEventListener("mouseout",c,!1)},!1),function(){return S}}function E(){return{objects:[],object:{},vertices:[],normals:[],colors:[],uvs:[],materialLibraries:[],startObject:function(e,t){if(this.object&&!1===this.object.fromDeclaration)return this.object.name=e,void(this.object.fromDeclaration=!1!==t);var r=this.object&&"function"==typeof this.object.currentMaterial?this.object.currentMaterial():void 0;if(this.object&&"function"==typeof this.object._finalize&&this.object._finalize(!0),this.object={name:e||"",fromDeclaration:!1!==t,geometry:{vertices:[],normals:[],colors:[],uvs:[]},materials:[],smooth:!0,startMaterial:function(e,t){var r=this._finalize(!1);r&&(r.inherited||0>=r.groupCount)&&this.materials.splice(r.index,1);var i={index:this.materials.length,name:e||"",mtllib:Array.isArray(t)&&0<t.length?t[t.length-1]:"",smooth:void 0===r?this.smooth:r.smooth,groupStart:void 0===r?0:r.groupEnd,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(e){var t={index:"number"==typeof e?e:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return t.clone=this.clone.bind(t),t}};return this.materials.push(i),i},currentMaterial:function(){return 0<this.materials.length?this.materials[this.materials.length-1]:void 0},_finalize:function(e){var t=this.currentMaterial();if(t&&-1===t.groupEnd&&(t.groupEnd=this.geometry.vertices.length/3,t.groupCount=t.groupEnd-t.groupStart,t.inherited=!1),e&&1<this.materials.length)for(var r=this.materials.length-1;0<=r;r--)0>=this.materials[r].groupCount&&this.materials.splice(r,1);return e&&0===this.materials.length&&this.materials.push({name:"",smooth:this.smooth}),t}},r&&r.name&&"function"==typeof r.clone){var i=r.clone(0);i.inherited=!0,this.object.materials.push(i)}this.objects.push(this.object)},finalize:function(){this.object&&"function"==typeof this.object._finalize&&this.object._finalize(!0)},parseVertexIndex:function(e,t){var r=parseInt(e,10);return 3*(0<=r?r-1:r+t/3)},parseNormalIndex:function(e,t){var r=parseInt(e,10);return 3*(0<=r?r-1:r+t/3)},parseUVIndex:function(e,t){var r=parseInt(e,10);return 2*(0<=r?r-1:r+t/2)},addVertex:function(e,t,r){var i=this.vertices,a=this.object.geometry.vertices;a.push(i[e+0],i[e+1],i[e+2]),a.push(i[t+0],i[t+1],i[t+2]),a.push(i[r+0],i[r+1],i[r+2])},addVertexPoint:function(e){var t=this.vertices,r=this.object.geometry.vertices;r.push(t[e+0],t[e+1],t[e+2])},addVertexLine:function(e){var t=this.vertices,r=this.object.geometry.vertices;r.push(t[e+0],t[e+1],t[e+2])},addNormal:function(e,t,r){var i=this.normals,a=this.object.geometry.normals;a.push(i[e+0],i[e+1],i[e+2]),a.push(i[t+0],i[t+1],i[t+2]),a.push(i[r+0],i[r+1],i[r+2])},addColor:function(e,t,r){var i=this.colors,a=this.object.geometry.colors;a.push(i[e+0],i[e+1],i[e+2]),a.push(i[t+0],i[t+1],i[t+2]),a.push(i[r+0],i[r+1],i[r+2])},addUV:function(e,t,r){var i=this.uvs,a=this.object.geometry.uvs;a.push(i[e+0],i[e+1]),a.push(i[t+0],i[t+1]),a.push(i[r+0],i[r+1])},addUVLine:function(e){var t=this.uvs,r=this.object.geometry.uvs;r.push(t[e+0],t[e+1])},addFace:function(e,t,r,i,a,n,o,s,l){var d=this.vertices.length,u=this.parseVertexIndex(e,d),m=this.parseVertexIndex(t,d),c=this.parseVertexIndex(r,d);if(this.addVertex(u,m,c),void 0!==i&&""!==i){var p=this.uvs.length;u=this.parseUVIndex(i,p),m=this.parseUVIndex(a,p),c=this.parseUVIndex(n,p),this.addUV(u,m,c)}if(void 0!==o&&""!==o){var f=this.normals.length;u=this.parseNormalIndex(o,f),m=o===s?u:this.parseNormalIndex(s,f),c=o===l?u:this.parseNormalIndex(l,f),this.addNormal(u,m,c)}0<this.colors.length&&this.addColor(u,m,c)},addPointGeometry:function(e){this.object.geometry.type="Points";for(var t=this.vertices.length,r=0,i=e.length;r<i;r++)this.addVertexPoint(this.parseVertexIndex(e[r],t))},addLineGeometry:function(e,t){this.object.geometry.type="Line";for(var r=this.vertices.length,i=this.uvs.length,a=0,n=e.length;a<n;a++)this.addVertexLine(this.parseVertexIndex(e[a],r));for(var o=0,n=t.length;o<n;o++)this.addUVLine(this.parseUVIndex(t[o],i))}}}function _(e){console.time("OBJLoader");var t=new E;-1!==e.indexOf("\r\n")&&(e=e.replace(/\r\n/g,"\n")),-1!==e.indexOf("\\\n")&&(e=e.replace(/\\\n/g,""));for(var r=e.split("\n"),a="",n="",o=0,s=[],d="function"==typeof"".trimLeft,u=0,m=r.length;u<m;u++)if(a=r[u],a=d?a.trimLeft():a.trim(),o=a.length,0!==o&&(n=a.charAt(0),"#"!==n))if("v"===n){var l=a.split(/\s+/);switch(l[0]){case"v":t.vertices.push(parseFloat(l[1]),parseFloat(l[2]),parseFloat(l[3])),8===l.length&&t.colors.push(parseFloat(l[4]),parseFloat(l[5]),parseFloat(l[6]));break;case"vn":t.normals.push(parseFloat(l[1]),parseFloat(l[2]),parseFloat(l[3]));break;case"vt":t.uvs.push(parseFloat(l[1]),parseFloat(l[2]));}}else if("f"===n){for(var c,p=a.substr(1).trim(),f=p.split(/\s+/),h=[],v=0,b=f.length;v<b;v++)if(c=f[v],0<c.length){var g=c.split("/");h.push(g)}for(var x=h[0],v=1,b=h.length-1;v<b;v++){var y=h[v],_=h[v+1];t.addFace(x[0],y[0],_[0],x[1],y[1],_[1],x[2],y[2],_[2])}}else if("l"===n){var A=a.substring(1).trim().split(" "),L=[],S=[];if(-1===a.indexOf("/"))L=A;else for(var z,N=0,I=A.length;N<I;N++)z=A[N].split("/"),""!==z[0]&&L.push(z[0]),""!==z[1]&&S.push(z[1]);t.addLineGeometry(L,S)}else if("p"===n){var p=a.substr(1).trim(),C=p.split(" ");t.addPointGeometry(C)}else if(null!==(s=ze.exec(a))){var O=(" "+s[0].substr(1).trim()).substr(1);t.startObject(O)}else if(Ie.test(a))t.object.startMaterial(a.substring(7).trim(),t.materialLibraries);else if(Ne.test(a))t.materialLibraries.push(a.substring(7).trim());else if("s"===n){if(s=a.split(" "),1<s.length){var V=s[1].trim().toLowerCase();t.object.smooth="0"!==V&&"off"!==V}else t.object.smooth=!0;var R=t.object.currentMaterial();R&&(R.smooth=t.object.smooth)}else{if("\0"===a)continue;throw new Error("THREE.OBJLoader: Unexpected line: \""+a+"\"")}t.finalize();var P=T(t);return t=null,console.timeEnd("OBJLoader"),P}function T(e){var t={children:[],materialLibraries:e.materialLibraries,position:{x:0,y:0,z:0},rotation:{},matrix:{},scale:{x:1,y:1,z:1}};return e.objects.forEach(e=>{var r={};for(var i in e.geometry)e.geometry[i].length&&("vertices"==i&&(r.position={data:new Float32Array(e.geometry[i]),num:3,count:e.geometry[i].length/3}),"normals"==i&&(r.normal={data:new Float32Array(e.geometry[i]),num:3,count:e.geometry[i].length/3}),"uvs"==i&&(r.texcoord={data:new Float32Array(e.geometry[i]),num:2,count:e.geometry[i].length/2}),"colors"==i&&(r.color={data:new Float32Array(e.geometry[i]),num:4,count:e.geometry[i].length/4}));var a={attributes:r,group:[],materials:e.materials,name:e.name,smooth:e.smooth,opacity:1},n=a.attributes.position;e.materials.forEach((e,t)=>{a.group.push({start:e.groupStart||0,end:e.groupEnd||n.data.length/n.num,count:e.groupCount||n.data.length/n.num,index:t})}),t.children.push(a)}),e=null,t}function A(e,t){function r(e){var t={name:e.name};for(var r in e){var i,o=e[r];if(""!==o)switch(r.toLowerCase()){case"ka":t.ambient=o;break;case"kd":t.color=o;break;case"ks":t.specular=o;break;case"ke":t.emissive=o;break;case"map_kd":t.map=a(o,t);break;case"map_ks":t.specularMap=a(o,t);break;case"map_ke":t.emissiveMap=a(o,t);break;case"norm":t.normalMap=a(o,t);break;case"map_bump":case"bump":t.bumpMap=a(o,t);break;case"map_d":t.alphaMap=a(o,t),t.transparent=!0;break;case"ns":t.shininess=parseFloat(o);break;case"d":i=parseFloat(o),t.opacity=i,t.color.push(i),1>i&&(t.transparent=!0);break;case"tr":i=parseFloat(o),t.opacity=1-i,t.color.push(i),0<i&&(t.transparent=!0);break;default:}}return t}function a(e,r){var i,a={scale:{x:1,y:1},offset:{x:0,y:0}},n=e.split(/\s+/);return i=n.indexOf("-bm"),0<=i&&(r.bumpScale=parseFloat(n[i+1]),n.splice(i,2)),i=n.indexOf("-s"),0<=i&&(a.scale={x:parseFloat(n[i+1]),y:parseFloat(n[i+2])},n.splice(i,4)),i=n.indexOf("-o"),0<=i&&(a.offset={x:parseFloat(n[i+1]),y:parseFloat(n[i+2])},n.splice(i,4)),a.src=(t.basePath||"")+n.join("").trim(),a}for(var n,o=e.split("\n"),l={},d=/\s+/,u={},c=0;c<o.length;c++)if(n=o[c],n=n.trim(),0!==n.length&&"#"!==n.charAt(0)){var p=n.indexOf(" "),f=0<=p?n.substring(0,p):n;f=f.toLowerCase();var h=0<=p?n.substring(p+1):"";if(h=h.trim(),"newmtl"===f)l={name:h},u[h]=l;else if("ka"===f||"kd"===f||"ks"===f||"ke"===f){var v=h.split(d,3);l[f]=[parseFloat(v[0]),parseFloat(v[1]),parseFloat(v[2])]}else l[f]=h}for(var s in u)u[s]=r(u[s],t);return u}function L(e,t,r,i){var a=new XMLHttpRequest;a.open("GET",e,!0),a.addEventListener("load",function(e){var r=this.response;200===this.status||0===this.status?(0===this.status&&console.warn("FileLoader: HTTP Status 0 received."),t&&t(r)):i&&i(e)},!1),a.addEventListener("progress",function(e){r&&r(e)},!1),a.addEventListener("error",function(e){i&&i(e)},!1),a.addEventListener("abort",function(e){i&&i(e)},!1),a.send(null)}function S(e){return $e[e].bindPoint}function z(e,t){return function(r){e.uniform1i(t,r)}}function N(e,t){return function(r){e.uniform1iv(t,r)}}function I(e,t){return function(r){e.uniform2iv(t,r)}}function C(e,t){return function(r){e.uniform3iv(t,r)}}function O(e,t){return function(r){e.uniform4iv(t,r)}}function V(e,t,r,i){const a=S(t);return D(e)?function(t){let n,o;j(e,t)?(n=t,o=null):(n=t.texture,o=t.sampler),e.uniform1i(i,r),e.activeTexture(e.TEXTURE0+r),e.bindTexture(a,n),e.bindSampler(r,o)}:function(t){e.uniform1i(i,r),e.activeTexture(e.TEXTURE0+r),e.bindTexture(a,t)}}function R(e,t,r,i,a){const n=S(t),o=new Int32Array(a);for(let n=0;n<a;++n)o[n]=r+n;return D(e)?function(t){e.uniform1iv(i,o),t.forEach(function(t,i){e.activeTexture(e.TEXTURE0+o[i]);let a,s;j(e,t)?(a=t,s=null):(a=t.texture,s=t.sampler),e.bindSampler(r,s),e.bindTexture(n,a)})}:function(t){e.uniform1iv(i,o),t.forEach(function(t,r){e.activeTexture(e.TEXTURE0+o[r]),e.bindTexture(n,t)})}}function P(e,t){return function(r){r.value?(e.disableVertexAttribArray(t),e.vertexAttrib4fv(t,r.value)):(e.bindBuffer(e.ARRAY_BUFFER,r.buffer),e.enableVertexAttribArray(t),e.vertexAttribPointer(t,r.num||r.size,r.type||e.FLOAT,r.normalize||!1,r.stride||0,r.offset||0),r.divisor!==void 0&&e.vertexAttribDivisor(t,r.divisor))}}function M(e,t){return function(r){r.value?(e.disableVertexAttribArray(t),e.vertexAttrib4iv(t,r.value)):(e.bindBuffer(e.ARRAY_BUFFER,r.buffer),e.enableVertexAttribArray(t),e.vertexAttribIPointer(t,r.num||r.size,r.type||e.INT,r.stride||0,r.offset||0),r.divisor!==void 0&&e.vertexAttribDivisor(t,r.divisor))}}function F(e,t){return function(r){r.value?(e.disableVertexAttribArray(t),e.vertexAttrib4uiv(t,r.value)):(e.bindBuffer(e.ARRAY_BUFFER,r.buffer),e.enableVertexAttribArray(t),e.vertexAttribIPointer(t,r.num||r.size,r.type||e.UNSIGNED_INT,r.stride||0,r.offset||0),r.divisor!==void 0&&e.vertexAttribDivisor(t,r.divisor))}}function B(e,t,r){const i=r.size,a=r.count;return function(r){e.bindBuffer(e.ARRAY_BUFFER,r.buffer);const n=r.size||r.num||i,o=r.type||e.FLOAT,s=$e[o],l=s.size*n,d=r.normalize||!1,u=r.offset||0;for(let s=0;s<a;++s)e.enableVertexAttribArray(t+s),e.vertexAttribPointer(t+s,n/a,o,d,l,u+l/a*s),void 0!==r.divisor&&e.vertexAttribDivisor(t+s,r.divisor)}}function j(e,r){return rt||(rt=e.createTexture()),r instanceof rt.constructor}function D(e){return!!e.texStorage2D}function U(e){const t=e.name;return t.startsWith("gl_")||t.startsWith("webgl_")}function w(e,t){at(e,0);const r=e.getExtension(t);if(r){const i={},a=nt.exec(t)[1];for(const t in r){const n=r[t],o="function"==typeof n,s=o?a:"_"+a;let l=t;t.endsWith(s)&&(l=t.substring(0,t.length-s.length)),e[l]===void 0?o?e[l]=function(e){return function(){return e.apply(r,arguments)}}(n):(e[l]=n,i[l]=n):!o&&e[l]!==n&&console.warn(l,e[l],n,t)}i.constructor={name:r.constructor.name},at(i,0)}return r}function G(e){for(let t=0;t<it.length;++t)w(e,it[t])}function k(e,...t){const r=X(t);return H(e,r)}function X(...e){const t=[];let r,i,a;if((e+"").replace(/[^\,\s]+/g,function(e){e&&t.push(e)}),t.forEach(e=>{if(a=document.getElementById(e),!a)throw"unknown script element "+e;0<=a.type.indexOf("vert")?r=a.text:0<=a.type.indexOf("frag")&&(i=a.text)}),!r)throw"VERTEX_SHADER String not exist";if(!i)throw"FRAGMENT_SHADER String not exist";return[r,i]}function H(e,...t){Array.isArray(t[0])&&(t=t[0]);const r=W(e,e.VERTEX_SHADER,t[0]),i=W(e,e.FRAGMENT_SHADER,t[1]);if(!r)throw"VERTEX_SHADER not exist";if(!i)throw"FRAGMENT_SHADER not exist";const a=e.createProgram();if(!a)throw"program not exist";e.attachShader(a,r),e.attachShader(a,i),e.linkProgram(a);const n=e.getProgramParameter(a,e.LINK_STATUS);if(!n){const t=e.getProgramInfoLog(a);throw e.deleteProgram(a),e.deleteShader(i),e.deleteShader(r),"Failed to link program: "+t.toString()}return a}function W(e,t,r){const i=e.createShader(t);if(!i)throw"unable to create shader";e.shaderSource(i,r),e.compileShader(i);const a=e.getShaderParameter(i,e.COMPILE_STATUS);if(!a){const t=e.getShaderInfoLog(i);throw e.deleteShader(i),"Failed to compile shader: "+t.toString()}return i}function Y(e,...t){Array.isArray(t[0])&&(t=t[0]);const r=0<t[0].indexOf("{")?H(e,t):k(e,t),i=J(e,r),a=q(e,r);return{program:r,uniformSetters:i,attribSetters:a}}function q(e,t){const r={},a=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let n=0;n<a;++n){const i=e.getActiveAttrib(t,n);if(U(i))continue;const a=e.getAttribLocation(t,i.name),o=et[i.type],s=o.setter(e,a,o);s.location=a,r[i.name]=s}return r}function J(e,t){function r(t,r){const a=e.getUniformLocation(t,r.name),n=1<r.size&&"[0]"===r.name.substr(-3),o=r.type,s=$e[o];if(!s)throw"unknown type: 0x"+o.toString(16);let l;if(s.bindPoint){const t=i;i+=r.size,l=n?s.arraySetter(e,o,t,a,r.size):s.setter(e,o,t,a,r.size)}else l=s.arraySetter&&n?s.arraySetter(e,a):s.setter(e,a);return l.location=a,l}let i=0;const a={},n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){const i=e.getActiveUniform(t,o);if(U(i))continue;let n=i.name;"[0]"===n.substr(-3)&&(n=n.substr(0,n.length-3));const s=r(t,i);a[n]=s}return a}function K(e,t){e=e.uniformSetters||e,Object.keys(t).forEach(function(r){const i=e[r];i&&i(t[r])})}function Q(e,t,r){r.vertexArrayObject?e.bindVertexArray(r.vertexArrayObject):(Z(t.attribSetters||t,r.attribs),r.indices&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,r.indices))}function Z(e,t){e=e.attribSetters||e,Object.keys(t).forEach(function(r){const i=e[r];i&&i(t[r])})}function $(e,t){const r={attribs:ee(e,t)};let i=t.indices;return i?(i=ie(i,"indices"),r.indices=te(e,i,e.ELEMENT_ARRAY_BUFFER),r.count=i.length,r.indexType=ne(i)):r.count=de(t),r}function ee(e,t){const r={};return Object.keys(t).forEach(function(i){if(!oe(i)){const a=t[i],n=a.name||a.attribName||tt.attribPrefix(i),o=ie(a,n);r[n]={buffer:te(e,o,void 0,a.drawType),num:a.num||a.size||ae(n),type:ne(o),normalize:le(o),stride:a.stride||0,offset:a.offset||0,divisor:a.divisor,drawType:a.drawType||e.STATIC_DRAW}}}),e.bindBuffer(e.ARRAY_BUFFER,null),r}function te(e,t,r,i){r=r||e.ARRAY_BUFFER;const a=e.createBuffer();return e.bindBuffer(r,a),e.bufferData(r,t,i||e.STATIC_DRAW),a}function re(e,t,r){const i=e.createVertexArray();return e.bindVertexArray(i),t.length||(t=[t]),t.forEach(function(t){Q(e,t,r)}),e.bindVertexArray(null),{count:r.count,indexType:r.indexType,vertexArrayObject:i}}function ie(e,t){if(se(e))return e;if(se(e.data))return e.data;Array.isArray(e)&&(e={data:e});let r=e.type;return r||(oe(t)?r=Uint16Array:r=Float32Array),new r(e.data)}function ae(e,t){let r;if(r=ot.test(e)?2:st.test(e)?4:3,0<t%r)throw"Can not guess num for attribute '"+e+"'. Tried "+r+" but "+t+" values is not evenly divisible by "+r+". You should specify it.";return r}function ne(e){if(e instanceof Int8Array)return Ce;if(e instanceof Uint8Array)return Oe;if(e instanceof Uint8ClampedArray)return Oe;if(e instanceof Int16Array)return Ve;if(e instanceof Uint16Array)return Re;if(e instanceof Int32Array)return je;if(e instanceof Uint32Array)return Je;if(e instanceof Float32Array)return Pe;throw"unsupported typed array type"}function oe(e){return"indices"===e}function se(e){return e&&e.buffer&&e.buffer instanceof ArrayBuffer}function le(e){return!!(e instanceof Int8Array)||!!(e instanceof Uint8Array)}function de(e){let t,r;for(r=0;r<lt.length&&(t=lt[r],!(t in e));++r);r===lt.length&&(t=Object.keys(e)[0]);const a=e[t],n=ue(a).length,o=me(a,t);if(0<n%o)throw"numComponents "+o+" not correct for length "+n;return n/o}function ue(e){return e.length?e:e.data}function me(e,t){return e.num||e.size||ae(t,ue(e).length)}function ce(){const e=function(e){if(e.lengthComputable){let t=100*(e.loaded/e.total);mt.innerHTML=he(t,2)+"% downloaded"}};return new Promise((t,r)=>{Se.load("../model/plane.mtl",function(i){console.log(i),Le.load("../model/plane.obj",function(e){this.setMaterial(e,i),console.log(e),t([i,e]),mt.style.display="none"},e,r)},null,r)})}async function pe(){if(!ut)return;const e=Y(ut,"#define GLSLIFY 1\nattribute vec4 aPosition;\nattribute vec4 aNormal;\nattribute vec2 aTexcoord;\nuniform mat4 vpMatrix;\nuniform mat4 modelMatrix;\nvarying vec3 vNormal;\nvarying vec3 vPosition;\nvarying vec2 vTexcoord;\n\nvoid main() {\n  gl_Position = vpMatrix * modelMatrix * aPosition;\n  vNormal = vec3(modelMatrix * aNormal);\n  vPosition= vec3(modelMatrix * aPosition);\n  vTexcoord = aTexcoord;\n}","precision mediump float;\n#define GLSLIFY 1\nuniform vec3 viewPosition;\nuniform vec3 lightPosition;\nuniform vec3 lightColor;\nuniform vec3 ambientColor;\nuniform vec3 specularColor;\nuniform float shininess;\nuniform vec4 color;\nvarying vec3 vNormal;\nvarying vec3 vPosition;\n\nvoid main() {\n    vec3 normal = normalize(vNormal);\n    // \u73AF\u5883\u5149\n    vec3 ambient = ambientColor * color.rgb;\n    // \u5149\u7EBF\u65B9\u5411\n    vec3 lightDirection = normalize(lightPosition - vPosition);\n    // \u5149\u7EBF\u65B9\u5411\u548C\u6CD5\u5411\u91CF\u5939\u89D2\n    float cosTheta = max(dot(lightDirection, normal), 0.0);\n    // \u6F2B\u53CD\u5C04\n    vec3 diffuse = lightColor * color.rgb * cosTheta;\n    // \u9AD8\u5149\n    vec3 viewDirection = normalize(viewPosition - vPosition);\n    vec3 halfwayDir = normalize(lightDirection + viewDirection);\n    float specularIntensity = pow(max(dot(normal, halfwayDir), 0.0), shininess);\n    vec3 specular = specularColor.rgb * specularIntensity;\n\n    gl_FragColor = vec4(ambient + diffuse + specular, color.a);\n}"),[t,r]=await ce();fe();const i=r.children.map(t=>{const r=$(ut,t.attributes);return t.vao=re(ut,e,r),t});let a=[],n=[];i.forEach(e=>{1>e.opacity?n.push(e):a.push(e)}),n.sort((e,t)=>e.opacity-t.opacity),ut.clearColor(0,0,0,1),ut.enable(ut.DEPTH_TEST),ut.enable(ut.CULL_FACE),g(dt),ut.viewport(0,0,dt.width,dt.height),ut.useProgram(e.program);const o=l(),s=l(),f=m(ge/6,dt.width/dt.height,1,50),v=y(dt,vt,2,40),b=l(),x=p(ge/180);K(e,{lightPosition:ct,lightColor:pt,ambientColor:ft}),function t(){function r(t){Q(ut,e,t.vao),t.group.forEach(async r=>{const i=t.materials[r.index];1>i.opacity&&!ut.isEnabled(ut.BLEND)?(ut.depthMask(!1),ut.enable(ut.BLEND),ut.blendFunc(ut.SRC_ALPHA,ut.ONE_MINUS_SRC_ALPHA)):1<=i.opacity&&ut.isEnabled(ut.BLEND)&&(ut.depthMask(!0),ut.disable(ut.BLEND)),K(e,{color:i.color,specularColor:i.specular,shininess:i.shininess}),ut.drawArrays(ut.TRIANGLES,r.start,r.count)})}ht?h(x,vt,vt):vt=v(),c(vt,[0,0,0],[0,1,0],s),u(f,d(s),o),K(e,{vpMatrix:o,viewPosition:vt,modelMatrix:b}),ut.clear(ut.COLOR_BUFFER_BIT|ut.DEPTH_BUFFER_BIT),a.forEach(r),n.forEach(r),ut.bindVertexArray(null),requestAnimationFrame(t)}()}function fe(){dt.addEventListener("mousedown",function(){ht=!1},!1)}let ye=Float32Array,Ee=Float32Array;const _e=e(),Te=e(),Ae=e();var Le=function(){return{options:{},load:function(e,t,r,i){var a=this;return L(e,function(e){var r=_(e);t.call(a,r)},r,i),a},setMaterial:function(e,t){var r;return e.children.forEach(e=>{e.opacity=1,e.materials.forEach(a=>{if(r=t[a.name],r.map&&r.map.scale&&e.attributes&&e.attributes.texcoord)for(var n=r.map.scale.x,o=r.map.scale.y,s=e.attributes.texcoord.data,d=s.length,l=0;l<d;l+=2)s[l]*=n,s[l+1]*=o;for(var u in r)a[u]=r[u];a.opacity<e.opacity&&(e.opacity=a.opacity)})}),e},set:function(e){return Object.assign(this.options,e),this},parse:_}}(),Se=function(){return{options:{},load:function(e,t,r,i){var a=this.options;return L(e,function(e){t(A(e,a))},r,i),this},set:function(e){return Object.assign(this.options,e),this},parse:A}}(),ze=/^[og]\s*(.+)?/,Ne=/^mtllib /,Ie=/^usemtl /;const Ce=5120,Oe=5121,Ve=5122,Re=5123,Pe=5126,Me=35664,Fe=35665,Be=35666,je=5124,De=35667,Ue=35668,we=35669,Ge=35670,ke=35671,Xe=35672,He=35673,We=35674,Ye=35675,qe=35676,Je=5125,Ke=36294,Qe=36295,Ze=36296,$e={};$e[Pe]={Type:Float32Array,size:4,setter:function(e,t){return function(r){e.uniform1f(t,r)}},arraySetter:function(e,t){return function(r){e.uniform1fv(t,r)}}},$e[Me]={Type:Float32Array,size:8,setter:function(e,t){return function(r){e.uniform2fv(t,r)}}},$e[Fe]={Type:Float32Array,size:12,setter:function(e,t){return function(r){e.uniform3fv(t,r)}}},$e[Be]={Type:Float32Array,size:16,setter:function(e,t){return function(r){e.uniform4fv(t,r)}}},$e[je]={Type:Int32Array,size:4,setter:z,arraySetter:N},$e[De]={Type:Int32Array,size:8,setter:I},$e[Ue]={Type:Int32Array,size:12,setter:C},$e[we]={Type:Int32Array,size:16,setter:O},$e[Je]={Type:Uint32Array,size:4,setter:function(e,t){return function(r){e.uniform1ui(t,r)}},arraySetter:function(e,t){return function(r){e.uniform1uiv(t,r)}}},$e[Ke]={Type:Uint32Array,size:8,setter:function(e,t){return function(r){e.uniform2uiv(t,r)}}},$e[Qe]={Type:Uint32Array,size:12,setter:function(e,t){return function(r){e.uniform3uiv(t,r)}}},$e[Ze]={Type:Uint32Array,size:16,setter:function(e,t){return function(r){e.uniform4uiv(t,r)}}},$e[Ge]={Type:Uint32Array,size:4,setter:z,arraySetter:N},$e[ke]={Type:Uint32Array,size:8,setter:I},$e[Xe]={Type:Uint32Array,size:12,setter:C},$e[He]={Type:Uint32Array,size:16,setter:O},$e[We]={Type:Float32Array,size:16,setter:function(e,t){return function(r){e.uniformMatrix2fv(t,!1,r)}}},$e[Ye]={Type:Float32Array,size:36,setter:function(e,t){return function(r){e.uniformMatrix3fv(t,!1,r)}}},$e[qe]={Type:Float32Array,size:64,setter:function(e,t){return function(r){e.uniformMatrix4fv(t,!1,r)}}},$e[35685]={Type:Float32Array,size:24,setter:function(e,t){return function(r){e.uniformMatrix2x3fv(t,!1,r)}}},$e[35686]={Type:Float32Array,size:32,setter:function(e,t){return function(r){e.uniformMatrix2x4fv(t,!1,r)}}},$e[35687]={Type:Float32Array,size:24,setter:function(e,t){return function(r){e.uniformMatrix3x2fv(t,!1,r)}}},$e[35688]={Type:Float32Array,size:48,setter:function(e,t){return function(r){e.uniformMatrix3x4fv(t,!1,r)}}},$e[35689]={Type:Float32Array,size:32,setter:function(e,t){return function(r){e.uniformMatrix4x2fv(t,!1,r)}}},$e[35690]={Type:Float32Array,size:48,setter:function(e,t){return function(r){e.uniformMatrix4x3fv(t,!1,r)}}},$e[35678]={Type:null,size:0,setter:V,arraySetter:R,bindPoint:3553},$e[35680]={Type:null,size:0,setter:V,arraySetter:R,bindPoint:34067},$e[35679]={Type:null,size:0,setter:V,arraySetter:R,bindPoint:32879},$e[36289]={Type:null,size:0,setter:V,arraySetter:R,bindPoint:35866};const et={};et[Pe]={size:4,setter:P},et[Me]={size:8,setter:P},et[Fe]={size:12,setter:P},et[Be]={size:16,setter:P},et[je]={size:4,setter:M},et[De]={size:8,setter:M},et[Ue]={size:12,setter:M},et[we]={size:16,setter:M},et[Je]={size:4,setter:F},et[Ke]={size:8,setter:F},et[Qe]={size:12,setter:F},et[Ze]={size:16,setter:F},et[Ge]={size:4,setter:M},et[ke]={size:8,setter:M},et[Xe]={size:12,setter:M},et[He]={size:16,setter:M},et[We]={size:4,setter:B,count:2},et[Ye]={size:9,setter:B,count:3},et[qe]={size:16,setter:B,count:4};const tt={addExtensionsToContext:!0,attribPrefix:e=>"a"+e[0].toUpperCase()+e.substr(1)};let rt;const it=["ANGLE_instanced_arrays","EXT_blend_minmax","EXT_color_buffer_float","EXT_color_buffer_half_float","EXT_disjoint_timer_query","EXT_disjoint_timer_query_webgl2","EXT_frag_depth","EXT_sRGB","EXT_shader_texture_lod","EXT_texture_filter_anisotropic","OES_element_index_uint","OES_standard_derivatives","OES_texture_float","OES_texture_float_linear","OES_texture_half_float","OES_texture_half_float_linear","OES_vertex_array_object","WEBGL_color_buffer_float","WEBGL_compressed_texture_atc","WEBGL_compressed_texture_etc1","WEBGL_compressed_texture_pvrtc","WEBGL_compressed_texture_s3tc","WEBGL_compressed_texture_s3tc_srgb","WEBGL_depth_texture","WEBGL_draw_buffers"],at=function(){function e(e){const i=e.constructor.name;if(!t[i]){for(const t in e)if("number"==typeof e[t]){const i=r[e[t]];r[e[t]]=i?`${i} | ${t}`:t}t[i]=!0}}const t={},r={};return function(t,i){return e(t),r[i]||"0x"+i.toString(16)}}(),nt=/^(.*?)_/,ot=/coord|texture/i,st=/color|colour/i,lt=["position","positions","a_position"];const dt=document.getElementById("canvas"),ut=function(e,t){const r=["webgl","experimental-webgl"];let a=null;for(let n=0,i=r.length;n<i;n++)if(a=e.getContext(r[n],t),a){tt.addExtensionsToContext&&G(a);break}return a}(dt,!0),mt=document.getElementsByTagName("h3")[0],ct=[0,10,-15],pt=[1,1,1],ft=[.5,.5,.5];let ht=!0,vt=[-8,9,12];pe()})();
