
	/**
	 * 平面(k*0*k)
	 */
	function Plane(k){
		//  v0------v2
	    //  |        | 
	    //  |        |
	    //  |        |
	    //  v1------v3
		var position = [-k,0,-k, -k,0,k,  k,0,-k, k,0,-k, -k,0,k, k,0,k],//0-1-2 2-1-3
	        normal = [0,1,0, 0,1,0, 0,1,0, 0,1,0, 0,1,0, 0,1,0];
	        // indices = [0,1,2, 2,1,3];

	    return { position, normal };
	}

	/**
	 * 立方体(k*k*k)
	 */
	function Cube(k){

		k = k||1;
	    var position = [
			-k, -k, -k,  -k,  k, -k,   k, -k, -k,  -k,  k, -k,  k,  k, -k,  k, -k, -k,
			-k, -k,  k,   k, -k,  k,  -k,  k,  k,  -k,  k,  k,  k, -k,  k,  k,  k,  k,
			-k,  k, -k,  -k,  k,  k,   k,  k, -k,  -k,  k,  k,  k,  k,  k,  k,  k, -k,
			-k, -k, -k,   k, -k, -k,  -k, -k,  k,  -k, -k,  k,  k, -k, -k,  k, -k,  k,
			-k, -k, -k,  -k, -k,  k,  -k,  k, -k,  -k, -k,  k, -k,  k,  k, -k,  k, -k,
			 k, -k, -k,   k,  k, -k,   k, -k,  k,   k, -k,  k,  k,  k, -k,  k,  k,  k,
	    ];

	    var normal = [
			0,  0, -1,   0,  0, -1,   0,  0, -1,   0,  0, -1,   0,  0, -1,   0,  0, -1,
			0,  0,  1,   0,  0,  1,   0,  0,  1,   0,  0,  1,   0,  0,  1,   0,  0,  1,
			0,  1,  0,   0,  1,  0,   0,  1,  0,   0,  1,  0,   0,  1,  0,   0,  1,  0,
			0, -1,  0,   0, -1,  0,   0, -1,  0,   0, -1,  0,   0, -1,  0,   0, -1,  0,
		   -1,  0,  0,  -1,  0,  0,  -1,  0,  0,  -1,  0,  0,  -1,  0,  0,  -1,  0,  0,
			1,  0,  0,   1,  0,  0,   1,  0,  0,   1,  0,  0,   1,  0,  0,   1,  0,  0,
	    ];
	    return { position, normal };
	}

	/**
	 * 圆柱体
	 * r 半径
	 * h 高度
	 * l 经度格数
	 * 	v0------v2
	 *  |        | 
	 *  |        |
	 *  |        |
	 *  v1------v3
	 */
	function Cylinder(r,h,l){
		r = r||1;
		h = h||1;
		l = l||3;
		var vertexs = [],
			position = [],
			normal = [],
			angle = Math.PI*2/l,
			x = 0, z = 0, step = 6;

		for(var i=0;i<l;i++){
			x = r * Math.cos(angle * i);
			z = r * Math.sin(angle * i);
			
			vertexs.push(x,h/2,z);
			vertexs.push(x,-h/2,z);
		}

		for(var i = 0, il = vertexs.length;i < il; i+=step){
			var i21 = (i+6)%il;
			var i22 = (i+7)%il;
			var i23 = (i+8)%il;
			var i31 = (i+9)%il;
			var i32 = (i+10)%il;
			var i33 = (i+11)%il;
			
			//顶点排序从背面开始，因此三角形顶点插入顺序是顺时针，插入到正面时就会变成逆时针
			position.push(0,h/2,0);//顶部
			position.push(vertexs[i21],vertexs[i22],vertexs[i23]);//2
			position.push(vertexs[i],vertexs[i+1],vertexs[i+2]);//0
			normal.push(0,1,0,0,1,0,0,1,0);

			position.push(vertexs[i],vertexs[i+1],vertexs[i+2]);//0
			position.push(vertexs[i21],vertexs[i22],vertexs[i23]);//2
			position.push(vertexs[i+3],vertexs[i+4],vertexs[i+5]);//1

			normal = normal.concat(normalize([vertexs[i],h/2,vertexs[i+2]]));
			normal = normal.concat(normalize([vertexs[i21],h/2,vertexs[i23]]));
			normal = normal.concat(normalize([vertexs[i+3],-h/2,vertexs[i+5]]));
			
			position.push(vertexs[i+3],vertexs[i+4],vertexs[i+5]);//1
			position.push(vertexs[i21],vertexs[i22],vertexs[i23]);//2
			position.push(vertexs[i31],vertexs[i32],vertexs[i33]);//3
			
			normal = normal.concat(normalize([vertexs[i+3],-h/2,vertexs[i+5]]));
			normal = normal.concat(normalize([vertexs[i21],h/2,vertexs[i23]]));
			normal = normal.concat(normalize([vertexs[i31],-h/2,vertexs[i33]]));

			position.push(0,-h/2,0);//底部
			position.push(vertexs[i+3],vertexs[i+4],vertexs[i+5]);//1
			position.push(vertexs[i31],vertexs[i32],vertexs[i33]);//3
			normal.push(0,-1,0,0,-1,0,0,-1,0);
		}
		vertexs = null;
		return { position, normal };
	}

	/**
	 * 圆锥体
	 * r 半径
	 * h 高度
	 * l 经度格数
	 * 	    v0
	 *     /
	 *    /
	 *   /
	 *  v1------v2
	 */
	function Cone(r,h,l){
		r = r||1;
		h = h||1;
		l = l||3;
		var vertexs = [],
			position = [],
			normal = [],
			angle = Math.PI*2/l,
			x = 0, y= r*r/h, z = 0, step = 3;

		for(var i=0;i<l;i++){
			x = r * Math.cos(angle * i);
			z = r * Math.sin(angle * i);
			vertexs.push(x,-h/2,z);
		}

		for(var i = 0, il = vertexs.length;i < il; i+=step){
			var i1 = (i+3)%il;
			var i2 = (i+4)%il;
			var i3 = (i+5)%il;

			position.push(0,h/2,0);//顶点
			position.push(vertexs[i1],vertexs[i2],vertexs[i3]);//1
			position.push(vertexs[i],vertexs[i+1],vertexs[i+2]);//0
			
			normal.push(0,1,0)
			normal = normal.concat(normalize([vertexs[i1],y,vertexs[i3]]));
			normal = normal.concat(normalize([vertexs[i],y,vertexs[i+2]]));

			position.push(0,-h/2,0);// 底部
			position.push(vertexs[i],vertexs[i+1],vertexs[i+2]);//0
			position.push(vertexs[i1],vertexs[i2],vertexs[i3]);//1
			normal.push(0,-1,0,0,-1,0,0,-1,0);
		}
		vertexs = null;
		return { position, normal };
	}

	/**
	 * 圆球
	 * r 半径
	 * l 经纬度格数
	 */
	function Sphere(r,l) {
		r = r||1;
	    l = l || 15;
	    var vertexs = [],
	    	position = [],
			normal = [],
			x, y, z,
			ang, ang2, radius;

	    // 创建顶点坐标
	    for (var j = 0; j <= l; j++) {
	        ang = j * Math.PI / l;
	        radius = r * Math.sin(ang);
	        y = r * Math.cos(ang);
	        for (var i = 0; i <= l; i++) {
	            ang2 = i * 2 * Math.PI / l;
	            x = Math.sin(ang2) * radius;
				z = Math.cos(ang2) * radius;
				
	            vertexs.push(x, y, z);// x y z
	        }
		}
		
	    for (j = 0; j < l; j++) {
	        for (i = 0; i < l; i++) {
	            var i1 = j * (l + 1) + i;
	            var i2 = i1 + l + 1;
				// indices.push(p1,p2,p1+1);
	            // indices.push(p1 + 1, p2, p2+1);
				position.push(vertexs[i1*3],vertexs[i1*3+1],vertexs[i1*3+2]);
				position.push(vertexs[i2*3],vertexs[i2*3+1],vertexs[i2*3+2]);
				position.push(vertexs[(i1+1)*3],vertexs[(i1+1)*3+1],vertexs[(i1+1)*3+2]);

				position.push(vertexs[(i1+1)*3],vertexs[(i1+1)*3+1],vertexs[(i1+1)*3+2]);
				position.push(vertexs[i2*3],vertexs[i2*3+1],vertexs[i2*3+2]);
				position.push(vertexs[(i2+1)*3],vertexs[(i2+1)*3+1],vertexs[(i2+1)*3+2]);

				normal = normal.concat(normalize([vertexs[i1*3],vertexs[i1*3+1],vertexs[i1*3+2]]));
				normal = normal.concat(normalize([vertexs[i2*3],vertexs[i2*3+1],vertexs[i2*3+2]]));
				normal = normal.concat(normalize([vertexs[(i1+1)*3],vertexs[(i1+1)*3+1],vertexs[(i1+1)*3+2]]));

				normal = normal.concat(normalize([vertexs[(i1+1)*3],vertexs[(i1+1)*3+1],vertexs[(i1+1)*3+2]]));
				normal = normal.concat(normalize([vertexs[i2*3],vertexs[i2*3+1],vertexs[i2*3+2]]));
				normal = normal.concat(normalize([vertexs[(i2+1)*3],vertexs[(i2+1)*3+1],vertexs[(i2+1)*3+2]]));
	        }
	    }
		vertexs = null;
		return { position, normal };
	}
	
    function normalize(v) {
        var c = v[0], d = v[1], e = v[2], g = Math.sqrt(c * c + d * d + e * e);
        if (!g) {
            v[0] = 0;
            v[1] = 0;
            v[2] = 0;
            return v;
        }
        if (g == 1) return v;
        g = 1 / g;
        v[0] = c * g;
        v[1] = d * g;
        v[2] = e * g;
        return v;
    }