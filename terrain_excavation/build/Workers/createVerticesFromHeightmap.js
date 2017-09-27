/**
 * Created by 赵辉辉 on 2017/9/27.
 */
/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2013 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
/**
 @license
 mersenne-twister.js - https://gist.github.com/banksean/300494

 Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
 All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions
 are met:

 1. Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in the
 documentation and/or other materials provided with the distribution.

 3. The names of its contributors may not be used to endorse or promote
 products derived from this software without specific prior written
 permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

!function () {
    define("Core/defined", [], function () {
        "use strict";
        var e = function (e) {
            return void 0 !== e
        };
        return e
    }), define("Core/freezeObject", ["./defined"], function (e) {
        "use strict";
        var t = Object.freeze;
        return e(t) || (t = function (e) {
            return e
        }), t
    }), define("Core/defaultValue", ["./freezeObject"], function (e) {
        "use strict";
        var t = function (e, t) {
            return void 0 !== e ? e : t
        };
        return t.EMPTY_OBJECT = e({}), t
    }), define("Core/DeveloperError", ["./defined"], function (e) {
        "use strict";
        var t = function (e) {
            this.name = "DeveloperError", this.message = e;
            var t = new Error;
            this.stack = t.stack
        };
        return t.prototype.toString = function () {
            var t = this.name + ": " + this.message;
            return e(this.stack) && (t += "\n" + this.stack.toString()), t
        }, t
    }), define("Core/Cartesian3", ["./defaultValue", "./defined", "./DeveloperError", "./freezeObject"], function (e, t, r, i) {
        "use strict";
        var n = function (t, r, i) {
            this.x = e(t, 0), this.y = e(r, 0), this.z = e(i, 0)
        };
        n.fromSpherical = function (i, o) {
            if (!t(i))throw new r("spherical is required");
            t(o) || (o = new n);
            var a = i.clock, u = i.cone, s = e(i.magnitude, 1), h = s * Math.sin(u);
            return o.x = h * Math.cos(a), o.y = h * Math.sin(a), o.z = s * Math.cos(u), o
        }, n.fromElements = function (e, r, i, o) {
            return t(o) ? (o.x = e, o.y = r, o.z = i, o) : new n(e, r, i)
        }, n.clone = function (e, r) {
            return t(e) ? t(r) ? (r.x = e.x, r.y = e.y, r.z = e.z, r) : new n(e.x, e.y, e.z) : void 0
        }, n.fromCartesian4 = n.clone, n.packedLength = 3, n.pack = function (i, n, o) {
            if (!t(i))throw new r("value is required");
            if (!t(n))throw new r("array is required");
            o = e(o, 0), n[o++] = i.x, n[o++] = i.y, n[o] = i.z
        }, n.unpack = function (i, o, a) {
            if (!t(i))throw new r("array is required");
            return o = e(o, 0), t(a) || (a = new n), a.x = i[o++], a.y = i[o++], a.z = i[o], a
        }, n.fromArray = n.unpack, n.getMaximumComponent = function (e) {
            if (!t(e))throw new r("cartesian is required");
            return Math.max(e.x, e.y, e.z)
        }, n.getMinimumComponent = function (e) {
            if (!t(e))throw new r("cartesian is required");
            return Math.min(e.x, e.y, e.z)
        }, n.magnitudeSquared = function (e) {
            if (!t(e))throw new r("cartesian is required");
            return e.x * e.x + e.y * e.y + e.z * e.z
        }, n.magnitude = function (e) {
            return Math.sqrt(n.magnitudeSquared(e))
        };
        var o = new n;
        n.distance = function (e, i) {
            if (!t(e) || !t(i))throw new r("left and right are required.");
            return n.subtract(e, i, o), n.magnitude(o)
        }, n.normalize = function (e, i) {
            if (!t(e))throw new r("cartesian is required");
            var o = n.magnitude(e);
            return t(i) ? (i.x = e.x / o, i.y = e.y / o, i.z = e.z / o, i) : new n(e.x / o, e.y / o, e.z / o)
        }, n.dot = function (e, i) {
            if (!t(e))throw new r("left is required");
            if (!t(i))throw new r("right is required");
            return e.x * i.x + e.y * i.y + e.z * i.z
        }, n.multiplyComponents = function (e, i, o) {
            if (!t(e))throw new r("left is required");
            if (!t(i))throw new r("right is required");
            return t(o) ? (o.x = e.x * i.x, o.y = e.y * i.y, o.z = e.z * i.z, o) : new n(e.x * i.x, e.y * i.y, e.z * i.z)
        }, n.add = function (e, i, o) {
            if (!t(e))throw new r("left is required");
            if (!t(i))throw new r("right is required");
            return t(o) ? (o.x = e.x + i.x, o.y = e.y + i.y, o.z = e.z + i.z, o) : new n(e.x + i.x, e.y + i.y, e.z + i.z)
        }, n.subtract = function (e, i, o) {
            if (!t(e))throw new r("left is required");
            if (!t(i))throw new r("right is required");
            return t(o) ? (o.x = e.x - i.x, o.y = e.y - i.y, o.z = e.z - i.z, o) : new n(e.x - i.x, e.y - i.y, e.z - i.z)
        }, n.multiplyByScalar = function (e, i, o) {
            if (!t(e))throw new r("cartesian is required");
            if ("number" != typeof i)throw new r("scalar is required and must be a number.");
            return t(o) ? (o.x = e.x * i, o.y = e.y * i, o.z = e.z * i, o) : new n(e.x * i, e.y * i, e.z * i)
        }, n.divideByScalar = function (e, i, o) {
            if (!t(e))throw new r("cartesian is required");
            if ("number" != typeof i)throw new r("scalar is required and must be a number.");
            return t(o) ? (o.x = e.x / i, o.y = e.y / i, o.z = e.z / i, o) : new n(e.x / i, e.y / i, e.z / i)
        }, n.negate = function (e, i) {
            if (!t(e))throw new r("cartesian is required");
            return t(i) ? (i.x = -e.x, i.y = -e.y, i.z = -e.z, i) : new n(-e.x, -e.y, -e.z)
        }, n.abs = function (e, i) {
            if (!t(e))throw new r("cartesian is required");
            return t(i) ? (i.x = Math.abs(e.x), i.y = Math.abs(e.y), i.z = Math.abs(e.z), i) : new n(Math.abs(e.x), Math.abs(e.y), Math.abs(e.z))
        };
        var a = new n;
        n.lerp = function (e, i, o, u) {
            if (!t(e))throw new r("start is required.");
            if (!t(i))throw new r("end is required.");
            if ("number" != typeof o)throw new r("t is required and must be a number.");
            return n.multiplyByScalar(i, o, a), u = n.multiplyByScalar(e, 1 - o, u), n.add(a, u, u)
        };
        var u = new n, s = new n;
        n.angleBetween = function (e, i) {
            if (!t(e))throw new r("left is required");
            if (!t(i))throw new r("right is required");
            n.normalize(e, u), n.normalize(i, s);
            var o = n.dot(u, s), a = n.magnitude(n.cross(u, s, u));
            return Math.atan2(a, o)
        };
        var h = new n;
        return n.mostOrthogonalAxis = function (e, i) {
            if (!t(e))throw new r("cartesian is required.");
            var o = n.normalize(e, h);
            return n.abs(o, o), i = o.x <= o.y ? o.x <= o.z ? n.clone(n.UNIT_X, i) : n.clone(n.UNIT_Z, i) : o.y <= o.z ? n.clone(n.UNIT_Y, i) : n.clone(n.UNIT_Z, i)
        }, n.equals = function (e, r) {
            return e === r || t(e) && t(r) && e.x === r.x && e.y === r.y && e.z === r.z
        }, n.equalsEpsilon = function (e, i, n) {
            if ("number" != typeof n)throw new r("epsilon is required and must be a number.");
            return e === i || t(e) && t(i) && Math.abs(e.x - i.x) <= n && Math.abs(e.y - i.y) <= n && Math.abs(e.z - i.z) <= n
        }, n.cross = function (e, i, o) {
            if (!t(e))throw new r("left is required");
            if (!t(i))throw new r("right is required");
            var a = e.x, u = e.y, s = e.z, h = i.x, c = i.y, d = i.z, f = u * d - s * c, w = s * h - a * d, l = a * c - u * h;
            return t(o) ? (o.x = f, o.y = w, o.z = l, o) : new n(f, w, l)
        }, n.ZERO = i(new n(0, 0, 0)), n.UNIT_X = i(new n(1, 0, 0)), n.UNIT_Y = i(new n(0, 1, 0)), n.UNIT_Z = i(new n(0, 0, 1)), n.prototype.clone = function (e) {
            return n.clone(this, e)
        }, n.prototype.equals = function (e) {
            return n.equals(this, e)
        }, n.prototype.equalsEpsilon = function (e, t) {
            return n.equalsEpsilon(this, e, t)
        }, n.prototype.toString = function () {
            return "(" + this.x + ", " + this.y + ", " + this.z + ")"
        }, n
    }), define("Core/Cartesian4", ["./defaultValue", "./defined", "./DeveloperError", "./freezeObject"], function (e, t, r, i) {
        "use strict";
        var n = function (t, r, i, n) {
            this.x = e(t, 0), this.y = e(r, 0), this.z = e(i, 0), this.w = e(n, 0)
        };
        n.fromElements = function (e, r, i, o, a) {
            return t(a) ? (a.x = e, a.y = r, a.z = i, a.w = o, a) : new n(e, r, i, o)
        }, n.clone = function (e, r) {
            return t(e) ? t(r) ? (r.x = e.x, r.y = e.y, r.z = e.z, r.w = e.w, r) : new n(e.x, e.y, e.z, e.w) : void 0
        }, n.packedLength = 4, n.pack = function (i, n, o) {
            if (!t(i))throw new r("value is required");
            if (!t(n))throw new r("array is required");
            o = e(o, 0), n[o++] = i.x, n[o++] = i.y, n[o++] = i.z, n[o] = i.w
        }, n.unpack = function (i, o, a) {
            if (!t(i))throw new r("array is required");
            return o = e(o, 0), t(a) || (a = new n), a.x = i[o++], a.y = i[o++], a.z = i[o++], a.w = i[o], a
        }, n.fromArray = n.unpack, n.getMaximumComponent = function (e) {
            if (!t(e))throw new r("cartesian is required");
            return Math.max(e.x, e.y, e.z, e.w)
        }, n.getMinimumComponent = function (e) {
            if (!t(e))throw new r("cartesian is required");
            return Math.min(e.x, e.y, e.z, e.w)
        }, n.magnitudeSquared = function (e) {
            if (!t(e))throw new r("cartesian is required");
            return e.x * e.x + e.y * e.y + e.z * e.z + e.w * e.w
        }, n.magnitude = function (e) {
            return Math.sqrt(n.magnitudeSquared(e))
        };
        var o = new n;
        n.distance = function (e, i) {
            if (!t(e) || !t(i))throw new r("left and right are required.");
            return n.subtract(e, i, o), n.magnitude(o)
        }, n.normalize = function (e, i) {
            if (!t(e))throw new r("cartesian is required");
            var o = n.magnitude(e);
            return t(i) ? (i.x = e.x / o, i.y = e.y / o, i.z = e.z / o, i.w = e.w / o, i) : new n(e.x / o, e.y / o, e.z / o, e.w / o)
        }, n.dot = function (e, i) {
            if (!t(e))throw new r("left is required");
            if (!t(i))throw new r("right is required");
            return e.x * i.x + e.y * i.y + e.z * i.z + e.w * i.w
        }, n.multiplyComponents = function (e, i, o) {
            if (!t(e))throw new r("left is required");
            if (!t(i))throw new r("right is required");
            return t(o) ? (o.x = e.x * i.x, o.y = e.y * i.y, o.z = e.z * i.z, o.w = e.w * i.w, o) : new n(e.x * i.x, e.y * i.y, e.z * i.z, e.w * i.w)
        }, n.add = function (e, i, o) {
            if (!t(e))throw new r("left is required");
            if (!t(i))throw new r("right is required");
            return t(o) ? (o.x = e.x + i.x, o.y = e.y + i.y, o.z = e.z + i.z, o.w = e.w + i.w, o) : new n(e.x + i.x, e.y + i.y, e.z + i.z, e.w + i.w)
        }, n.subtract = function (e, i, o) {
            if (!t(e))throw new r("left is required");
            if (!t(i))throw new r("right is required");
            return t(o) ? (o.x = e.x - i.x, o.y = e.y - i.y, o.z = e.z - i.z, o.w = e.w - i.w, o) : new n(e.x - i.x, e.y - i.y, e.z - i.z, e.w - i.w)
        }, n.multiplyByScalar = function (e, i, o) {
            if (!t(e))throw new r("cartesian is required");
            if ("number" != typeof i)throw new r("scalar is required and must be a number.");
            return t(o) ? (o.x = e.x * i, o.y = e.y * i, o.z = e.z * i, o.w = e.w * i, o) : new n(e.x * i, e.y * i, e.z * i, e.w * i)
        }, n.divideByScalar = function (e, i, o) {
            if (!t(e))throw new r("cartesian is required");
            if ("number" != typeof i)throw new r("scalar is required and must be a number.");
            return t(o) ? (o.x = e.x / i, o.y = e.y / i, o.z = e.z / i, o.w = e.w / i, o) : new n(e.x / i, e.y / i, e.z / i, e.w / i)
        }, n.negate = function (e, i) {
            if (!t(e))throw new r("cartesian is required");
            return t(i) ? (i.x = -e.x, i.y = -e.y, i.z = -e.z, i.w = -e.w, i) : new n(-e.x, -e.y, -e.z, -e.w)
        }, n.abs = function (e, i) {
            if (!t(e))throw new r("cartesian is required");
            return t(i) ? (i.x = Math.abs(e.x), i.y = Math.abs(e.y), i.z = Math.abs(e.z), i.w = Math.abs(e.w), i) : new n(Math.abs(e.x), Math.abs(e.y), Math.abs(e.z), Math.abs(e.w))
        };
        var a = new n;
        n.lerp = function (e, i, o, u) {
            if (!t(e))throw new r("start is required.");
            if (!t(i))throw new r("end is required.");
            if ("number" != typeof o)throw new r("t is required and must be a number.");
            return n.multiplyByScalar(i, o, a), u = n.multiplyByScalar(e, 1 - o, u), n.add(a, u, u)
        };
        var u = new n;
        return n.mostOrthogonalAxis = function (e, i) {
            if (!t(e))throw new r("cartesian is required.");
            var o = n.normalize(e, u);
            return n.abs(o, o), i = o.x <= o.y ? o.x <= o.z ? o.x <= o.w ? n.clone(n.UNIT_X, i) : n.clone(n.UNIT_W, i) : o.z <= o.w ? n.clone(n.UNIT_Z, i) : n.clone(n.UNIT_W, i) : o.y <= o.z ? o.y <= o.w ? n.clone(n.UNIT_Y, i) : n.clone(n.UNIT_W, i) : o.z <= o.w ? n.clone(n.UNIT_Z, i) : n.clone(n.UNIT_W, i)
        }, n.equals = function (e, r) {
            return e === r || t(e) && t(r) && e.x === r.x && e.y === r.y && e.z === r.z && e.w === r.w
        }, n.equalsEpsilon = function (e, i, n) {
            if ("number" != typeof n)throw new r("epsilon is required and must be a number.");
            return e === i || t(e) && t(i) && Math.abs(e.x - i.x) <= n && Math.abs(e.y - i.y) <= n && Math.abs(e.z - i.z) <= n && Math.abs(e.w - i.w) <= n
        }, n.ZERO = i(new n(0, 0, 0, 0)), n.UNIT_X = i(new n(1, 0, 0, 0)), n.UNIT_Y = i(new n(0, 1, 0, 0)), n.UNIT_Z = i(new n(0, 0, 1, 0)), n.UNIT_W = i(new n(0, 0, 0, 1)), n.prototype.clone = function (e) {
            return n.clone(this, e)
        }, n.prototype.equals = function (e) {
            return n.equals(this, e)
        }, n.prototype.equalsEpsilon = function (e, t) {
            return n.equalsEpsilon(this, e, t)
        }, n.prototype.toString = function () {
            return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")"
        }, n
    }), define("ThirdParty/mersenne-twister", [], function () {
        var e = function (e) {
            void 0 == e && (e = (new Date).getTime()), this.N = 624, this.M = 397, this.MATRIX_A = 2567483615, this.UPPER_MASK = 2147483648, this.LOWER_MASK = 2147483647, this.mt = new Array(this.N), this.mti = this.N + 1, this.init_genrand(e)
        };
        return e.prototype.init_genrand = function (e) {
            for (this.mt[0] = e >>> 0, this.mti = 1; this.mti < this.N; this.mti++) {
                var e = this.mt[this.mti - 1] ^ this.mt[this.mti - 1] >>> 30;
                this.mt[this.mti] = (1812433253 * ((4294901760 & e) >>> 16) << 16) + 1812433253 * (65535 & e) + this.mti, this.mt[this.mti] >>>= 0
            }
        }, e.prototype.genrand_int32 = function () {
            var e, t = new Array(0, this.MATRIX_A);
            if (this.mti >= this.N) {
                var r;
                for (this.mti == this.N + 1 && this.init_genrand(5489), r = 0; r < this.N - this.M; r++)e = this.mt[r] & this.UPPER_MASK | this.mt[r + 1] & this.LOWER_MASK, this.mt[r] = this.mt[r + this.M] ^ e >>> 1 ^ t[1 & e];
                for (; r < this.N - 1; r++)e = this.mt[r] & this.UPPER_MASK | this.mt[r + 1] & this.LOWER_MASK, this.mt[r] = this.mt[r + (this.M - this.N)] ^ e >>> 1 ^ t[1 & e];
                e = this.mt[this.N - 1] & this.UPPER_MASK | this.mt[0] & this.LOWER_MASK, this.mt[this.N - 1] = this.mt[this.M - 1] ^ e >>> 1 ^ t[1 & e], this.mti = 0
            }
            return e = this.mt[this.mti++], e ^= e >>> 11, e ^= 2636928640 & e << 7, e ^= 4022730752 & e << 15, e ^= e >>> 18, e >>> 0
        }, e.prototype.random = function () {
            return this.genrand_int32() * (1 / 4294967296)
        }, e
    }), define("Core/Math", ["./defaultValue", "./defined", "./DeveloperError", "../ThirdParty/mersenne-twister"], function (e, t, r, i) {
        "use strict";
        var n = {};
        n.EPSILON1 = .1, n.EPSILON2 = .01, n.EPSILON3 = .001, n.EPSILON4 = 1e-4, n.EPSILON5 = 1e-5, n.EPSILON6 = 1e-6, n.EPSILON7 = 1e-7, n.EPSILON8 = 1e-8, n.EPSILON9 = 1e-9, n.EPSILON10 = 1e-10, n.EPSILON11 = 1e-11, n.EPSILON12 = 1e-12, n.EPSILON13 = 1e-13, n.EPSILON14 = 1e-14, n.EPSILON15 = 1e-15, n.EPSILON16 = 1e-16, n.EPSILON17 = 1e-17, n.EPSILON18 = 1e-18, n.EPSILON19 = 1e-19, n.EPSILON20 = 1e-20, n.GRAVITATIONALPARAMETER = 3986004418e5, n.SOLAR_RADIUS = 6955e5, n.LUNAR_RADIUS = 1737400, n.SIXTY_FOUR_KILOBYTES = 65536, n.sign = function (e) {
            return e > 0 ? 1 : 0 > e ? -1 : 0
        }, n.sinh = function (e) {
            var t = Math.pow(Math.E, e), r = Math.pow(Math.E, -1 * e);
            return .5 * (t - r)
        }, n.cosh = function (e) {
            var t = Math.pow(Math.E, e), r = Math.pow(Math.E, -1 * e);
            return .5 * (t + r)
        }, n.lerp = function (e, t, r) {
            return (1 - r) * e + r * t
        }, n.PI = Math.PI, n.ONE_OVER_PI = 1 / Math.PI, n.PI_OVER_TWO = .5 * Math.PI, n.PI_OVER_THREE = Math.PI / 3, n.PI_OVER_FOUR = Math.PI / 4, n.PI_OVER_SIX = Math.PI / 6, n.THREE_PI_OVER_TWO = .5 * 3 * Math.PI, n.TWO_PI = 2 * Math.PI, n.ONE_OVER_TWO_PI = 1 / (2 * Math.PI), n.RADIANS_PER_DEGREE = Math.PI / 180, n.DEGREES_PER_RADIAN = 180 / Math.PI, n.RADIANS_PER_ARCSECOND = n.RADIANS_PER_DEGREE / 3600, n.toRadians = function (e) {
            return e * n.RADIANS_PER_DEGREE
        }, n.toDegrees = function (e) {
            return e * n.DEGREES_PER_RADIAN
        }, n.convertLongitudeRange = function (e) {
            var t = n.TWO_PI, r = e - Math.floor(e / t) * t;
            return r < -Math.PI ? r + t : r >= Math.PI ? r - t : r
        }, n.negativePiToPi = function (e) {
            for (var t = n.EPSILON10, r = n.PI, i = n.TWO_PI; -(r + t) > e;)e += i;
            if (-r > e)return -r;
            for (; e > r + t;)e -= i;
            return e > r ? r : e
        }, n.zeroToTwoPi = function (e) {
            var t = e % n.TWO_PI;
            return 0 > t ? (t + n.TWO_PI) % n.TWO_PI : t
        }, n.equalsEpsilon = function (t, r, i) {
            return i = e(i, 0), Math.abs(t - r) <= i
        };
        var o = [1];
        n.factorial = function (e) {
            if ("number" != typeof e || 0 > e)throw new r("A number greater than or equal to 0 is required.");
            var t = o.length;
            if (e >= t)for (var i = o[t - 1], n = t; e >= n; n++)o.push(i * n);
            return o[e]
        }, n.incrementWrap = function (t, i, n) {
            if (n = e(n, 0), n >= i)throw new r("Maximum value must be greater than minimum value.");
            return ++t, t > i && (t = n), t
        }, n.isPowerOfTwo = function (t) {
            if ("number" != typeof t || 0 > t)throw new r("A number greater than or equal to 0 is required.");
            var i = e(t, 0);
            return 0 !== i && 0 === (i & i - 1)
        }, n.clamp = function (e, t, r) {
            return t > e ? t : e > r ? r : e
        };
        var a = new i;
        return n.setRandomNumberSeed = function (e) {
            if (!t(e))throw new r("seed is required.");
            a = new i(e)
        }, n.nextRandomNumber = function () {
            return a.random()
        }, n
    }), define("Core/Cartographic", ["./defaultValue", "./defined", "./DeveloperError", "./freezeObject", "./Math"], function (e, t, r, i, n) {
        "use strict";
        var o = function (t, r, i) {
            this.longitude = e(t, 0), this.latitude = e(r, 0), this.height = e(i, 0)
        };
        return o.fromDegrees = function (r, i, a, u) {
            return r = n.toRadians(e(r, 0)), i = n.toRadians(e(i, 0)), a = e(a, 0), t(u) ? (u.longitude = r, u.latitude = i, u.height = a, u) : new o(r, i, a)
        }, o.clone = function (e, r) {
            return t(e) ? t(r) ? (r.longitude = e.longitude, r.latitude = e.latitude, r.height = e.height, r) : new o(e.longitude, e.latitude, e.height) : void 0
        }, o.equals = function (e, r) {
            return e === r || t(e) && t(r) && e.longitude === r.longitude && e.latitude === r.latitude && e.height === r.height
        }, o.equalsEpsilon = function (e, i, n) {
            if ("number" != typeof n)throw new r("epsilon is required and must be a number.");
            return e === i || t(e) && t(i) && Math.abs(e.longitude - i.longitude) <= n && Math.abs(e.latitude - i.latitude) <= n && Math.abs(e.height - i.height) <= n
        }, o.toString = function (e) {
            if (!t(e))throw new r("cartographic is required");
            return "(" + e.longitude + ", " + e.latitude + ", " + e.height + ")"
        }, o.ZERO = i(new o(0, 0, 0)), o.prototype.clone = function (e) {
            return o.clone(this, e)
        }, o.prototype.equals = function (e) {
            return o.equals(this, e)
        }, o.prototype.equalsEpsilon = function (e, t) {
            return o.equalsEpsilon(this, e, t)
        }, o.prototype.toString = function () {
            return o.toString(this)
        }, o
    }), define("Core/Ellipsoid", ["./freezeObject", "./defaultValue", "./defined", "./DeveloperError", "./Math", "./Cartesian3", "./Cartographic"], function (e, t, r, i, n, o, a) {
        "use strict";
        var u = function (e, r, a) {
            if (e = t(e, 0), r = t(r, 0), a = t(a, 0), 0 > e || 0 > r || 0 > a)throw new i("All radii components must be greater than or equal to zero.");
            this._radii = new o(e, r, a), this._radiiSquared = new o(e * e, r * r, a * a), this._radiiToTheFourth = new o(e * e * e * e, r * r * r * r, a * a * a * a), this._oneOverRadii = new o(0 === e ? 0 : 1 / e, 0 === r ? 0 : 1 / r, 0 === a ? 0 : 1 / a), this._oneOverRadiiSquared = new o(0 === e ? 0 : 1 / (e * e), 0 === r ? 0 : 1 / (r * r), 0 === a ? 0 : 1 / (a * a)), this._minimumRadius = Math.min(e, r, a), this._maximumRadius = Math.max(e, r, a), this._centerToleranceSquared = n.EPSILON1
        };
        u.clone = function (e, t) {
            if (!r(e))return void 0;
            var i = e._radii;
            return r(t) ? (o.clone(i, t._radii), o.clone(e._radiiSquared, t._radiiSquared), o.clone(e._radiiToTheFourth, t._radiiToTheFourth), o.clone(e._oneOverRadii, t._oneOverRadii), o.clone(e._oneOverRadiiSquared, t._oneOverRadiiSquared), t._minimumRadius = e._minimumRadius, t._maximumRadius = e._maximumRadius, t._centerToleranceSquared = e._centerToleranceSquared, t) : new u(i.x, i.y, i.z)
        }, u.fromCartesian3 = function (e) {
            return r(e) ? new u(e.x, e.y, e.z) : new u
        }, u.WGS84 = e(new u(6378137, 6378137, 6356752.314245179)), u.UNIT_SPHERE = e(new u(1, 1, 1)), u.MOON = e(new u(n.LUNAR_RADIUS, n.LUNAR_RADIUS, n.LUNAR_RADIUS)), u.prototype.getRadii = function () {
            return this._radii
        }, u.prototype.getRadiiSquared = function () {
            return this._radiiSquared
        }, u.prototype.getRadiiToTheFourth = function () {
            return this._radiiToTheFourth
        }, u.prototype.getOneOverRadii = function () {
            return this._oneOverRadii
        }, u.prototype.getOneOverRadiiSquared = function () {
            return this._oneOverRadiiSquared
        }, u.prototype.getMinimumRadius = function () {
            return this._minimumRadius
        }, u.prototype.getMaximumRadius = function () {
            return this._maximumRadius
        }, u.prototype.clone = function (e) {
            return u.clone(this, e)
        }, u.prototype.geocentricSurfaceNormal = o.normalize, u.prototype.geodeticSurfaceNormalCartographic = function (e, t) {
            if (!r(e))throw new i("cartographic is required.");
            var n = e.longitude, a = e.latitude, u = Math.cos(a), s = u * Math.cos(n), h = u * Math.sin(n), c = Math.sin(a);
            return r(t) || (t = new o), t.x = s, t.y = h, t.z = c, o.normalize(t, t)
        }, u.prototype.geodeticSurfaceNormal = function (e, t) {
            return t = o.multiplyComponents(e, this._oneOverRadiiSquared, t), o.normalize(t, t)
        };
        var s = new o, h = new o;
        u.prototype.cartographicToCartesian = function (e, t) {
            var r = s, i = h;
            this.geodeticSurfaceNormalCartographic(e, r), o.multiplyComponents(this._radiiSquared, r, i);
            var n = Math.sqrt(o.dot(r, i));
            return o.divideByScalar(i, n, i), o.multiplyByScalar(r, e.height, r), o.add(i, r, t)
        }, u.prototype.cartographicArrayToCartesianArray = function (e, t) {
            if (!r(e))throw new i("cartographics is required.");
            var n = e.length;
            r(t) ? t.length = n : t = new Array(n);
            for (var o = 0; n > o; o++)t[o] = this.cartographicToCartesian(e[o], t[o]);
            return t
        };
        var c = new o, d = new o, f = new o;
        u.prototype.cartesianToCartographic = function (e, t) {
            var i = this.scaleToGeodeticSurface(e, d);
            if (!r(i))return void 0;
            var u = this.geodeticSurfaceNormal(i, c), s = o.subtract(e, i, f), h = Math.atan2(u.y, u.x), w = Math.asin(u.z), l = n.sign(o.dot(s, e)) * o.magnitude(s);
            return r(t) ? (t.longitude = h, t.latitude = w, t.height = l, t) : new a(h, w, l)
        }, u.prototype.cartesianArrayToCartographicArray = function (e, t) {
            if (!r(e))throw new i("cartesians is required.");
            var n = e.length;
            r(t) ? t.length = n : t = new Array(n);
            for (var o = 0; n > o; ++o)t[o] = this.cartesianToCartographic(e[o], t[o]);
            return t
        };
        var w = new o, l = new o;
        return u.prototype.scaleToGeodeticSurface = function (e, t) {
            if (!r(e))throw new i("cartesian is required.");
            var a = e.x, u = e.y, s = e.z, h = this._oneOverRadii, c = h.x, d = h.y, f = h.z, m = a * a * c * c, p = u * u * d * d, y = s * s * f * f, g = m + p + y, x = Math.sqrt(1 / g), v = o.multiplyByScalar(e, x, w);
            if (g < this._centerToleranceSquared)return isFinite(x) ? o.clone(v, t) : void 0;
            var q = this._oneOverRadiiSquared, z = q.x, M = q.y, b = q.z, E = l;
            E.x = 2 * v.x * z, E.y = 2 * v.y * M, E.z = 2 * v.z * b;
            var S, O, R, _, T, I, P, C, N, U, A, L = (1 - x) * o.magnitude(e) / (.5 * o.magnitude(E)), W = 0;
            do {
                L -= W, R = 1 / (1 + L * z), _ = 1 / (1 + L * M), T = 1 / (1 + L * b), I = R * R, P = _ * _, C = T * T, N = I * R, U = P * _, A = C * T, S = m * I + p * P + y * C - 1, O = m * N * z + p * U * M + y * A * b;
                var D = -2 * O;
                W = S / D
            } while (Math.abs(S) > n.EPSILON12);
            return r(t) ? (t.x = a * R, t.y = u * _, t.z = s * T, t) : new o(a * R, u * _, s * T)
        }, u.prototype.scaleToGeocentricSurface = function (e, t) {
            if (!r(e))throw new i("cartesian is required.");
            var n = e.x, a = e.y, u = e.z, s = this._oneOverRadiiSquared, h = 1 / Math.sqrt(n * n * s.x + a * a * s.y + u * u * s.z);
            return o.multiplyByScalar(e, h, t)
        }, u.prototype.transformPositionToScaledSpace = function (e, t) {
            return o.multiplyComponents(e, this._oneOverRadii, t)
        }, u.prototype.equals = function (e) {
            return this === e || r(e) && o.equals(this._radii, e._radii)
        }, u.prototype.toString = function () {
            return this._radii.toString()
        }, u
    }), define("Core/GeographicProjection", ["./defaultValue", "./defined", "./Cartesian3", "./Cartographic", "./Ellipsoid"], function (e, t, r, i, n) {
        "use strict";
        var o = function (t) {
            this._ellipsoid = e(t, n.WGS84), this._semimajorAxis = this._ellipsoid.getMaximumRadius(), this._oneOverSemimajorAxis = 1 / this._semimajorAxis
        };
        return o.prototype.getEllipsoid = function () {
            return this._ellipsoid
        }, o.prototype.project = function (e, i) {
            var n = this._semimajorAxis, o = e.longitude * n, a = e.latitude * n, u = e.height;
            return t(i) ? (i.x = o, i.y = a, i.z = u, i) : new r(o, a, u)
        }, o.prototype.unproject = function (e, r) {
            var n = this._oneOverSemimajorAxis, o = e.x * n, a = e.y * n, u = e.z;
            return t(r) ? (r.longitude = o, r.latitude = a, r.height = u, r) : new i(o, a, u)
        }, o
    }), define("Core/Enumeration", ["./defined"], function (e) {
        "use strict";
        var t = function (t, r, i) {
            if (this.value = t, this.name = r, e(i))for (var n in i)i.hasOwnProperty(n) && (this[n] = i[n])
        };
        return t.prototype.valueOf = function () {
            return this.value
        }, t.prototype.toString = function () {
            return this.name
        }, t
    }), define("Core/Intersect", ["./Enumeration"], function (e) {
        "use strict";
        var t = {OUTSIDE: new e(-1, "OUTSIDE"), INTERSECTING: new e(0, "INTERSECTING"), INSIDE: new e(1, "INSIDE")};
        return t
    }), define("Core/Interval", ["./defaultValue"], function (e) {
        "use strict";
        var t = function (t, r) {
            this.start = e(t, 0), this.stop = e(r, 0)
        };
        return t
    }), define("Core/Matrix3", ["./Cartesian3", "./defaultValue", "./defined", "./DeveloperError", "./freezeObject", "./Math"], function (e, t, r, i, n, o) {
        "use strict";
        function a(e) {
            for (var t = 0, r = 0; 9 > r; ++r) {
                var i = e[r];
                t += i * i
            }
            return Math.sqrt(t)
        }

        function u(e) {
            for (var t = 0, r = 0; 3 > r; ++r) {
                var i = e[h.getElementIndex(d[r], c[r])];
                t += 2 * i * i
            }
            return Math.sqrt(t)
        }

        function s(e, t) {
            for (var r = o.EPSILON15, i = 0, n = 1, a = 0; 3 > a; ++a) {
                var u = Math.abs(e[h.getElementIndex(d[a], c[a])]);
                u > i && (n = a, i = u)
            }
            var s = 1, f = 0, w = c[n], l = d[n];
            if (Math.abs(e[h.getElementIndex(l, w)]) > r) {
                var m, p = e[h.getElementIndex(l, l)], y = e[h.getElementIndex(w, w)], g = e[h.getElementIndex(l, w)], x = (p - y) / 2 / g;
                m = 0 > x ? -1 / (-x + Math.sqrt(1 + x * x)) : 1 / (x + Math.sqrt(1 + x * x)), s = 1 / Math.sqrt(1 + m * m), f = m * s
            }
            return t = h.clone(h.IDENTITY, t), t[h.getElementIndex(w, w)] = t[h.getElementIndex(l, l)] = s, t[h.getElementIndex(l, w)] = f, t[h.getElementIndex(w, l)] = -f, t
        }

        var h = function (e, r, i, n, o, a, u, s, h) {
            this[0] = t(e, 0), this[1] = t(n, 0), this[2] = t(u, 0), this[3] = t(r, 0), this[4] = t(o, 0), this[5] = t(s, 0), this[6] = t(i, 0), this[7] = t(a, 0), this[8] = t(h, 0)
        };
        h.clone = function (e, t) {
            return r(e) ? r(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t) : new h(e[0], e[3], e[6], e[1], e[4], e[7], e[2], e[5], e[8]) : void 0
        }, h.fromColumnMajorArray = function (e, t) {
            if (!r(e))throw new i("values parameter is required");
            return h.clone(e, t)
        }, h.fromRowMajorArray = function (e, t) {
            if (!r(e))throw new i("values is required.");
            return r(t) ? (t[0] = e[0], t[1] = e[3], t[2] = e[6], t[3] = e[1], t[4] = e[4], t[5] = e[7], t[6] = e[2], t[7] = e[5], t[8] = e[8], t) : new h(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8])
        }, h.fromQuaternion = function (e, t) {
            if (!r(e))throw new i("quaternion is required");
            var n = e.x * e.x, o = e.x * e.y, a = e.x * e.z, u = e.x * e.w, s = e.y * e.y, c = e.y * e.z, d = e.y * e.w, f = e.z * e.z, w = e.z * e.w, l = e.w * e.w, m = n - s - f + l, p = 2 * (o - w), y = 2 * (a + d), g = 2 * (o + w), x = -n + s - f + l, v = 2 * (c - u), q = 2 * (a - d), z = 2 * (c + u), M = -n - s + f + l;
            return r(t) ? (t[0] = m, t[1] = g, t[2] = q, t[3] = p, t[4] = x, t[5] = z, t[6] = y, t[7] = v, t[8] = M, t) : new h(m, p, y, g, x, v, q, z, M)
        }, h.fromScale = function (e, t) {
            if (!r(e))throw new i("scale is required.");
            return r(t) ? (t[0] = e.x, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = e.y, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = e.z, t) : new h(e.x, 0, 0, 0, e.y, 0, 0, 0, e.z)
        }, h.fromUniformScale = function (e, t) {
            if ("number" != typeof e)throw new i("scale is required.");
            return r(t) ? (t[0] = e, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = e, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = e, t) : new h(e, 0, 0, 0, e, 0, 0, 0, e)
        }, h.fromRotationX = function (e, t) {
            if (!r(e))throw new i("angle is required.");
            var n = Math.cos(e), o = Math.sin(e);
            return r(t) ? (t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = n, t[5] = o, t[6] = 0, t[7] = -o, t[8] = n, t) : new h(1, 0, 0, 0, n, -o, 0, o, n)
        }, h.fromRotationY = function (e, t) {
            if (!r(e))throw new i("angle is required.");
            var n = Math.cos(e), o = Math.sin(e);
            return r(t) ? (t[0] = n, t[1] = 0, t[2] = -o, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = o, t[7] = 0, t[8] = n, t) : new h(n, 0, o, 0, 1, 0, -o, 0, n)
        }, h.fromRotationZ = function (e, t) {
            if (!r(e))throw new i("angle is required.");
            var n = Math.cos(e), o = Math.sin(e);
            return r(t) ? (t[0] = n, t[1] = o, t[2] = 0, t[3] = -o, t[4] = n, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t) : new h(n, -o, 0, o, n, 0, 0, 0, 1)
        }, h.toArray = function (e, t) {
            if (!r(e))throw new i("matrix is required");
            return r(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t) : [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8]]
        }, h.getElementIndex = function (e, t) {
            if ("number" != typeof t || 0 > t || t > 2)throw new i("row is required and must be 0, 1, or 2.");
            if ("number" != typeof e || 0 > e || e > 2)throw new i("column is required and must be 0, 1, or 2.");
            return 3 * e + t
        }, h.getColumn = function (t, n, o) {
            if (!r(t))throw new i("matrix is required.");
            if ("number" != typeof n || 0 > n || n > 2)throw new i("index is required and must be 0, 1, or 2.");
            var a = 3 * n, u = t[a], s = t[a + 1], h = t[a + 2];
            return r(o) ? (o.x = u, o.y = s, o.z = h, o) : new e(u, s, h)
        }, h.setColumn = function (e, t, n, o) {
            if (!r(e))throw new i("matrix is required");
            if (!r(n))throw new i("cartesian is required");
            if ("number" != typeof t || 0 > t || t > 2)throw new i("index is required and must be 0, 1, or 2.");
            o = h.clone(e, o);
            var a = 3 * t;
            return o[a] = n.x, o[a + 1] = n.y, o[a + 2] = n.z, o
        }, h.getRow = function (t, n, o) {
            if (!r(t))throw new i("matrix is required.");
            if ("number" != typeof n || 0 > n || n > 2)throw new i("index is required and must be 0, 1, or 2.");
            var a = t[n], u = t[n + 3], s = t[n + 6];
            return r(o) ? (o.x = a, o.y = u, o.z = s, o) : new e(a, u, s)
        }, h.setRow = function (e, t, n, o) {
            if (!r(e))throw new i("matrix is required");
            if (!r(n))throw new i("cartesian is required");
            if ("number" != typeof t || 0 > t || t > 2)throw new i("index is required and must be 0, 1, or 2.");
            return o = h.clone(e, o), o[t] = n.x, o[t + 3] = n.y, o[t + 6] = n.z, o
        }, h.multiply = function (e, t, n) {
            if (!r(e))throw new i("left is required");
            if (!r(t))throw new i("right is required");
            var o = e[0] * t[0] + e[3] * t[1] + e[6] * t[2], a = e[1] * t[0] + e[4] * t[1] + e[7] * t[2], u = e[2] * t[0] + e[5] * t[1] + e[8] * t[2], s = e[0] * t[3] + e[3] * t[4] + e[6] * t[5], c = e[1] * t[3] + e[4] * t[4] + e[7] * t[5], d = e[2] * t[3] + e[5] * t[4] + e[8] * t[5], f = e[0] * t[6] + e[3] * t[7] + e[6] * t[8], w = e[1] * t[6] + e[4] * t[7] + e[7] * t[8], l = e[2] * t[6] + e[5] * t[7] + e[8] * t[8];
            return r(n) ? (n[0] = o, n[1] = a, n[2] = u, n[3] = s, n[4] = c, n[5] = d, n[6] = f, n[7] = w, n[8] = l, n) : new h(o, s, f, a, c, w, u, d, l)
        }, h.multiplyByVector = function (t, n, o) {
            if (!r(t))throw new i("matrix is required");
            if (!r(n))throw new i("cartesian is required");
            var a = n.x, u = n.y, s = n.z, h = t[0] * a + t[3] * u + t[6] * s, c = t[1] * a + t[4] * u + t[7] * s, d = t[2] * a + t[5] * u + t[8] * s;
            return r(o) ? (o.x = h, o.y = c, o.z = d, o) : new e(h, c, d)
        }, h.multiplyByScalar = function (e, t, n) {
            if (!r(e))throw new i("matrix is required");
            if ("number" != typeof t)throw new i("scalar is required and must be a number");
            return r(n) ? (n[0] = e[0] * t, n[1] = e[1] * t, n[2] = e[2] * t, n[3] = e[3] * t, n[4] = e[4] * t, n[5] = e[5] * t, n[6] = e[6] * t, n[7] = e[7] * t, n[8] = e[8] * t, n) : new h(e[0] * t, e[3] * t, e[6] * t, e[1] * t, e[4] * t, e[7] * t, e[2] * t, e[5] * t, e[8] * t)
        }, h.negate = function (e, t) {
            if (!r(e))throw new i("matrix is required");
            return r(t) ? (t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t[3] = -e[3], t[4] = -e[4], t[5] = -e[5], t[6] = -e[6], t[7] = -e[7], t[8] = -e[8], t) : new h(-e[0], -e[3], -e[6], -e[1], -e[4], -e[7], -e[2], -e[5], -e[8])
        }, h.transpose = function (e, t) {
            if (!r(e))throw new i("matrix is required");
            var n = e[0], o = e[3], a = e[6], u = e[1], s = e[4], c = e[7], d = e[2], f = e[5], w = e[8];
            return r(t) ? (t[0] = n, t[1] = o, t[2] = a, t[3] = u, t[4] = s, t[5] = c, t[6] = d, t[7] = f, t[8] = w, t) : new h(n, u, d, o, s, f, a, c, w)
        };
        var c = [1, 0, 0], d = [2, 2, 1], f = new h, w = new h;
        return h.getEigenDecomposition = function (e, t) {
            if (!r(e))throw new i("matrix is required.");
            var n = o.EPSILON20, c = 10, d = 0, l = 0;
            r(t) || (t = {});
            for (var m = t.unitary = h.clone(h.IDENTITY, t.unitary), p = t.diagonal = h.clone(e, t.diagonal), y = n * a(p); c > l && u(p) > y;)s(p, f), h.transpose(f, w), h.multiply(p, f, p), h.multiply(w, p, p), h.multiply(m, f, m), ++d > 2 && (++l, d = 0);
            return t
        }, h.equals = function (e, t) {
            return e === t || r(e) && r(t) && e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3] && e[4] === t[4] && e[5] === t[5] && e[6] === t[6] && e[7] === t[7] && e[8] === t[8]
        }, h.equalsEpsilon = function (e, t, n) {
            if ("number" != typeof n)throw new i("epsilon is required and must be a number");
            return e === t || r(e) && r(t) && Math.abs(e[0] - t[0]) <= n && Math.abs(e[1] - t[1]) <= n && Math.abs(e[2] - t[2]) <= n && Math.abs(e[3] - t[3]) <= n && Math.abs(e[4] - t[4]) <= n && Math.abs(e[5] - t[5]) <= n && Math.abs(e[6] - t[6]) <= n && Math.abs(e[7] - t[7]) <= n && Math.abs(e[8] - t[8]) <= n
        }, h.IDENTITY = n(new h(1, 0, 0, 0, 1, 0, 0, 0, 1)), h.COLUMN0ROW0 = 0, h.COLUMN0ROW1 = 1, h.COLUMN0ROW2 = 2, h.COLUMN1ROW0 = 3, h.COLUMN1ROW1 = 4, h.COLUMN1ROW2 = 5, h.COLUMN2ROW0 = 6, h.COLUMN2ROW1 = 7, h.COLUMN2ROW2 = 8, h.prototype.clone = function (e) {
            return h.clone(this, e)
        }, h.prototype.equals = function (e) {
            return h.equals(this, e)
        }, h.prototype.equalsEpsilon = function (e, t) {
            return h.equalsEpsilon(this, e, t)
        }, h.prototype.toString = function () {
            return "(" + this[0] + ", " + this[3] + ", " + this[6] + ")\n" + "(" + this[1] + ", " + this[4] + ", " + this[7] + ")\n" + "(" + this[2] + ", " + this[5] + ", " + this[8] + ")"
        }, h
    }), define("Core/RuntimeError", ["./defined"], function (e) {
        "use strict";
        var t = function (e) {
            this.name = "RuntimeError", this.message = e;
            var t = new Error;
            this.stack = t.stack
        };
        return t.prototype.toString = function () {
            var t = this.name + ": " + this.message;
            return e(this.stack) && (t += "\n" + this.stack.toString()), t
        }, t
    }), define("Core/Matrix4", ["./Cartesian3", "./Cartesian4", "./defaultValue", "./defined", "./DeveloperError", "./freezeObject", "./Math", "./Matrix3", "./RuntimeError"], function (e, t, r, i, n, o, a, u, s) {
        "use strict";
        var h = function (e, t, i, n, o, a, u, s, h, c, d, f, w, l, m, p) {
            this[0] = r(e, 0), this[1] = r(o, 0), this[2] = r(h, 0), this[3] = r(w, 0), this[4] = r(t, 0), this[5] = r(a, 0), this[6] = r(c, 0), this[7] = r(l, 0), this[8] = r(i, 0), this[9] = r(u, 0), this[10] = r(d, 0), this[11] = r(m, 0), this[12] = r(n, 0), this[13] = r(s, 0), this[14] = r(f, 0), this[15] = r(p, 0)
        };
        h.clone = function (e, t) {
            return i(e) ? i(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t) : new h(e[0], e[4], e[8], e[12], e[1], e[5], e[9], e[13], e[2], e[6], e[10], e[14], e[3], e[7], e[11], e[15]) : void 0
        }, h.fromColumnMajorArray = function (e, t) {
            if (!i(e))throw new n("values parameter is required");
            return h.clone(e, t)
        }, h.fromRowMajorArray = function (e, t) {
            if (!i(e))throw new n("values is required.");
            return i(t) ? (t[0] = e[0], t[1] = e[4], t[2] = e[8], t[3] = e[12], t[4] = e[1], t[5] = e[5], t[6] = e[9], t[7] = e[13], t[8] = e[2], t[9] = e[6], t[10] = e[10], t[11] = e[14], t[12] = e[3], t[13] = e[7], t[14] = e[11], t[15] = e[15], t) : new h(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15])
        }, h.fromRotationTranslation = function (e, t, r) {
            if (!i(e))throw new n("rotation is required.");
            if (!i(t))throw new n("translation is required.");
            return i(r) ? (r[0] = e[0], r[1] = e[1], r[2] = e[2], r[3] = 0, r[4] = e[3], r[5] = e[4], r[6] = e[5], r[7] = 0, r[8] = e[6], r[9] = e[7], r[10] = e[8], r[11] = 0, r[12] = t.x, r[13] = t.y, r[14] = t.z, r[15] = 1, r) : new h(e[0], e[3], e[6], t.x, e[1], e[4], e[7], t.y, e[2], e[5], e[8], t.z, 0, 0, 0, 1)
        }, new u, h.fromTranslationQuaternionRotationScale = function (e, t, r, o) {
            if (!i(e))throw new n("translation is required.");
            if (!i(t))throw new n("rotation is required.");
            if (!i(r))throw new n("scale is required.");
            i(o) || (o = new h);
            var a = r.x, u = r.y, s = r.z, c = t.x * t.x, d = t.x * t.y, f = t.x * t.z, w = t.x * t.w, l = t.y * t.y, m = t.y * t.z, p = t.y * t.w, y = t.z * t.z, g = t.z * t.w, x = t.w * t.w, v = c - l - y + x, q = 2 * (d - g), z = 2 * (f + p), M = 2 * (d + g), b = -c + l - y + x, E = 2 * (m - w), S = 2 * (f - p), O = 2 * (m + w), R = -c - l + y + x;
            return o[0] = v * a, o[1] = M * a, o[2] = S * a, o[3] = 0, o[4] = q * u, o[5] = b * u, o[6] = O * u, o[7] = 0, o[8] = z * s, o[9] = E * s, o[10] = R * s, o[11] = 0, o[12] = e.x, o[13] = e.y, o[14] = e.z, o[15] = 1, o
        }, h.fromTranslation = function (e, t) {
            return h.fromRotationTranslation(u.IDENTITY, e, t)
        }, h.fromScale = function (e, t) {
            if (!i(e))throw new n("scale is required.");
            return i(t) ? (t[0] = e.x, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = e.y, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = e.z, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t) : new h(e.x, 0, 0, 0, 0, e.y, 0, 0, 0, 0, e.z, 0, 0, 0, 0, 1)
        }, h.fromUniformScale = function (e, t) {
            if ("number" != typeof e)throw new n("scale is required.");
            return i(t) ? (t[0] = e, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = e, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = e, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t) : new h(e, 0, 0, 0, 0, e, 0, 0, 0, 0, e, 0, 0, 0, 0, 1)
        };
        var c = new e, d = new e, f = new e;
        h.fromCamera = function (t, r) {
            if (!i(t))throw new n("camera is required.");
            var o = t.eye, a = t.target, u = t.up;
            if (!i(o))throw new n("camera.eye is required.");
            if (!i(a))throw new n("camera.target is required.");
            if (!i(u))throw new n("camera.up is required.");
            e.normalize(e.subtract(a, o, c), c), e.normalize(e.cross(c, u, d), d), e.normalize(e.cross(d, c, f), f);
            var s = d.x, w = d.y, l = d.z, m = c.x, p = c.y, y = c.z, g = f.x, x = f.y, v = f.z, q = o.x, z = o.y, M = o.z, b = s * -q + w * -z + l * -M, E = g * -q + x * -z + v * -M, S = m * q + p * z + y * M;
            return i(r) ? (r[0] = s, r[1] = g, r[2] = -m, r[3] = 0, r[4] = w, r[5] = x, r[6] = -p, r[7] = 0, r[8] = l, r[9] = v, r[10] = -y, r[11] = 0, r[12] = b, r[13] = E, r[14] = S, r[15] = 1, r) : new h(s, w, l, b, g, x, v, E, -m, -p, -y, S, 0, 0, 0, 1)
        }, h.computePerspectiveFieldOfView = function (e, t, r, o, a) {
            if (0 >= e || e > Math.PI)throw new n("fovY must be in [0, PI).");
            if (0 >= t)throw new n("aspectRatio must be greater than zero.");
            if (0 >= r)throw new n("near must be greater than zero.");
            if (0 >= o)throw new n("far must be greater than zero.");
            var u = Math.tan(.5 * e), s = 1 / u, c = s / t, d = (o + r) / (r - o), f = 2 * o * r / (r - o);
            return i(a) ? (a[0] = c, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = s, a[6] = 0, a[7] = 0, a[8] = 0, a[9] = 0, a[10] = d, a[11] = -1, a[12] = 0, a[13] = 0, a[14] = f, a[15] = 0, a) : new h(c, 0, 0, 0, 0, s, 0, 0, 0, 0, d, f, 0, 0, -1, 0)
        }, h.computeOrthographicOffCenter = function (e, t, r, o, a, u, s) {
            if (!i(e))throw new n("left is required.");
            if (!i(t))throw new n("right is required.");
            if (!i(r))throw new n("bottom is required.");
            if (!i(o))throw new n("top is required.");
            if (!i(a))throw new n("near is required.");
            if (!i(u))throw new n("far is required.");
            var c = 1 / (t - e), d = 1 / (o - r), f = 1 / (u - a), w = -(t + e) * c, l = -(o + r) * d, m = -(u + a) * f;
            return c *= 2, d *= 2, f *= -2, i(s) ? (s[0] = c, s[1] = 0, s[2] = 0, s[3] = 0, s[4] = 0, s[5] = d, s[6] = 0, s[7] = 0, s[8] = 0, s[9] = 0, s[10] = f, s[11] = 0, s[12] = w, s[13] = l, s[14] = m, s[15] = 1, s) : new h(c, 0, 0, w, 0, d, 0, l, 0, 0, f, m, 0, 0, 0, 1)
        }, h.computePerspectiveOffCenter = function (e, t, r, o, a, u, s) {
            if (!i(e))throw new n("left is required.");
            if (!i(t))throw new n("right is required.");
            if (!i(r))throw new n("bottom is required.");
            if (!i(o))throw new n("top is required.");
            if (!i(a))throw new n("near is required.");
            if (!i(u))throw new n("far is required.");
            var c = 2 * a / (t - e), d = 2 * a / (o - r), f = (t + e) / (t - e), w = (o + r) / (o - r), l = -(u + a) / (u - a), m = -1, p = -2 * u * a / (u - a);
            return i(s) ? (s[0] = c, s[1] = 0, s[2] = 0, s[3] = 0, s[4] = 0, s[5] = d, s[6] = 0, s[7] = 0, s[8] = f, s[9] = w, s[10] = l, s[11] = m, s[12] = 0, s[13] = 0, s[14] = p, s[15] = 0, s) : new h(c, 0, f, 0, 0, d, w, 0, 0, 0, l, p, 0, 0, m, 0)
        }, h.computeInfinitePerspectiveOffCenter = function (e, t, r, o, a, u) {
            if (!i(e))throw new n("left is required.");
            if (!i(t))throw new n("right is required.");
            if (!i(r))throw new n("bottom is required.");
            if (!i(o))throw new n("top is required.");
            if (!i(a))throw new n("near is required.");
            var s = 2 * a / (t - e), c = 2 * a / (o - r), d = (t + e) / (t - e), f = (o + r) / (o - r), w = -1, l = -1, m = -2 * a;
            return i(u) ? (u[0] = s, u[1] = 0, u[2] = 0, u[3] = 0, u[4] = 0, u[5] = c, u[6] = 0, u[7] = 0, u[8] = d, u[9] = f, u[10] = w, u[11] = l, u[12] = 0, u[13] = 0, u[14] = m, u[15] = 0, u) : new h(s, 0, d, 0, 0, c, f, 0, 0, 0, w, m, 0, 0, l, 0)
        }, h.computeViewportTransformation = function (e, t, n, o) {
            e = r(e, r.EMPTY_OBJECT);
            var a = r(e.x, 0), u = r(e.y, 0), s = r(e.width, 0), c = r(e.height, 0);
            t = r(t, 0), n = r(n, 1);
            var d = .5 * s, f = .5 * c, w = .5 * (n - t), l = d, m = f, p = w, y = a + d, g = u + f, x = t + w, v = 1;
            return i(o) ? (o[0] = l, o[1] = 0, o[2] = 0, o[3] = 0, o[4] = 0, o[5] = m, o[6] = 0, o[7] = 0, o[8] = 0, o[9] = 0, o[10] = p, o[11] = 0, o[12] = y, o[13] = g, o[14] = x, o[15] = v, o) : new h(l, 0, 0, y, 0, m, 0, g, 0, 0, p, x, 0, 0, 0, v)
        }, h.toArray = function (e, t) {
            if (!i(e))throw new n("matrix is required");
            return i(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t) : [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]]
        }, h.getElementIndex = function (e, t) {
            if ("number" != typeof t || 0 > t || t > 3)throw new n("row is required and must be 0, 1, 2, or 3.");
            if ("number" != typeof e || 0 > e || e > 3)throw new n("column is required and must be 0, 1, 2, or 3.");
            return 4 * e + t
        }, h.getColumn = function (e, r, o) {
            if (!i(e))throw new n("matrix is required.");
            if ("number" != typeof r || 0 > r || r > 3)throw new n("index is required and must be 0, 1, 2, or 3.");
            var a = 4 * r, u = e[a], s = e[a + 1], h = e[a + 2], c = e[a + 3];
            return i(o) ? (o.x = u, o.y = s, o.z = h, o.w = c, o) : new t(u, s, h, c)
        }, h.setColumn = function (e, t, r, o) {
            if (!i(e))throw new n("matrix is required");
            if (!i(r))throw new n("cartesian is required");
            if ("number" != typeof t || 0 > t || t > 3)throw new n("index is required and must be 0, 1, 2, or 3.");
            o = h.clone(e, o);
            var a = 4 * t;
            return o[a] = r.x, o[a + 1] = r.y, o[a + 2] = r.z, o[a + 3] = r.w, o
        }, h.getRow = function (e, r, o) {
            if (!i(e))throw new n("matrix is required.");
            if ("number" != typeof r || 0 > r || r > 3)throw new n("index is required and must be 0, 1, 2, or 3.");
            var a = e[r], u = e[r + 4], s = e[r + 8], h = e[r + 12];
            return i(o) ? (o.x = a, o.y = u, o.z = s, o.w = h, o) : new t(a, u, s, h)
        }, h.setRow = function (e, t, r, o) {
            if (!i(e))throw new n("matrix is required");
            if (!i(r))throw new n("cartesian is required");
            if ("number" != typeof t || 0 > t || t > 3)throw new n("index is required and must be 0, 1, 2, or 3.");
            return o = h.clone(e, o), o[t] = r.x, o[t + 4] = r.y, o[t + 8] = r.z, o[t + 12] = r.w, o
        }, h.multiply = function (e, t, r) {
            if (!i(e))throw new n("left is required");
            if (!i(t))throw new n("right is required");
            var o = e[0], a = e[1], u = e[2], s = e[3], c = e[4], d = e[5], f = e[6], w = e[7], l = e[8], m = e[9], p = e[10], y = e[11], g = e[12], x = e[13], v = e[14], q = e[15], z = t[0], M = t[1], b = t[2], E = t[3], S = t[4], O = t[5], R = t[6], _ = t[7], T = t[8], I = t[9], P = t[10], C = t[11], N = t[12], U = t[13], A = t[14], L = t[15], W = o * z + c * M + l * b + g * E, D = a * z + d * M + m * b + x * E, V = u * z + f * M + p * b + v * E, B = s * z + w * M + y * b + q * E, j = o * S + c * O + l * R + g * _, k = a * S + d * O + m * R + x * _, H = u * S + f * O + p * R + v * _, F = s * S + w * O + y * R + q * _, G = o * T + c * I + l * P + g * C, Z = a * T + d * I + m * P + x * C, Y = u * T + f * I + p * P + v * C, X = s * T + w * I + y * P + q * C, K = o * N + c * U + l * A + g * L, J = a * N + d * U + m * A + x * L, Q = u * N + f * U + p * A + v * L, $ = s * N + w * U + y * A + q * L;
            return i(r) ? (r[0] = W, r[1] = D, r[2] = V, r[3] = B, r[4] = j, r[5] = k, r[6] = H, r[7] = F, r[8] = G, r[9] = Z, r[10] = Y, r[11] = X, r[12] = K, r[13] = J, r[14] = Q, r[15] = $, r) : new h(W, j, G, K, D, k, Z, J, V, H, Y, Q, B, F, X, $)
        }, h.multiplyByTranslation = function (e, t, r) {
            if (!i(e))throw new n("matrix is required");
            if (!i(t))throw new n("translation is required");
            var o = t.x, a = t.y, u = t.z, s = o * e[0] + a * e[4] + u * e[8] + e[12], c = o * e[1] + a * e[5] + u * e[9] + e[13], d = o * e[2] + a * e[6] + u * e[10] + e[14];
            return i(r) ? (r[0] = e[0], r[1] = e[1], r[2] = e[2], r[3] = e[3], r[4] = e[4], r[5] = e[5], r[6] = e[6], r[7] = e[7], r[8] = e[8], r[9] = e[9], r[10] = e[10], r[11] = e[11], r[12] = s, r[13] = c, r[14] = d, r[15] = e[15], r) : new h(e[0], e[4], e[8], s, e[1], e[5], e[9], c, e[2], e[6], e[10], d, e[3], e[7], e[11], e[15])
        };
        var w = new e;
        h.multiplyByUniformScale = function (e, t, r) {
            if ("number" != typeof t)throw new n("scale is required");
            return w.x = t, w.y = t, w.z = t, h.multiplyByScale(e, w, r)
        }, h.multiplyByScale = function (e, t, r) {
            if (!i(e))throw new n("matrix is required");
            if (!i(t))throw new n("scale is required");
            var o = t.x, a = t.y, u = t.z;
            return 1 === o && 1 === a && 1 === u ? h.clone(e, r) : i(r) ? (r[0] = o * e[0], r[1] = o * e[1], r[2] = o * e[2], r[3] = 0, r[4] = a * e[4], r[5] = a * e[5], r[6] = a * e[6], r[7] = 0, r[8] = u * e[8], r[9] = u * e[9], r[10] = u * e[10], r[11] = 0, r[12] = e[12], r[13] = e[13], r[14] = e[14], r[15] = 1, r) : new h(o * e[0], a * e[4], u * e[8], e[12], o * e[1], a * e[5], u * e[9], e[13], o * e[2], a * e[6], u * e[10], e[14], 0, 0, 0, 1)
        }, h.multiplyByVector = function (e, r, o) {
            if (!i(e))throw new n("matrix is required");
            if (!i(r))throw new n("cartesian is required");
            var a = r.x, u = r.y, s = r.z, h = r.w, c = e[0] * a + e[4] * u + e[8] * s + e[12] * h, d = e[1] * a + e[5] * u + e[9] * s + e[13] * h, f = e[2] * a + e[6] * u + e[10] * s + e[14] * h, w = e[3] * a + e[7] * u + e[11] * s + e[15] * h;
            return i(o) ? (o.x = c, o.y = d, o.z = f, o.w = w, o) : new t(c, d, f, w)
        };
        var l = new t(0, 0, 0, 1);
        return h.multiplyByPoint = function (e, t, r) {
            if (!i(t))throw new n("cartesian is required");
            return l.x = t.x, l.y = t.y, l.z = t.z, h.multiplyByVector(e, l, r)
        }, h.multiplyByScalar = function (e, t, r) {
            if (!i(e))throw new n("matrix is required");
            if ("number" != typeof t)throw new n("scalar is required and must be a number");
            return i(r) ? (r[0] = e[0] * t, r[1] = e[1] * t, r[2] = e[2] * t, r[3] = e[3] * t, r[4] = e[4] * t, r[5] = e[5] * t, r[6] = e[6] * t, r[7] = e[7] * t, r[8] = e[8] * t, r[9] = e[9] * t, r[10] = e[10] * t, r[11] = e[11] * t, r[12] = e[12] * t, r[13] = e[13] * t, r[14] = e[14] * t, r[15] = e[15] * t, r) : new h(e[0] * t, e[4] * t, e[8] * t, e[12] * t, e[1] * t, e[5] * t, e[9] * t, e[13] * t, e[2] * t, e[6] * t, e[10] * t, e[14] * t, e[3] * t, e[7] * t, e[11] * t, e[15] * t)
        }, h.negate = function (e, t) {
            if (!i(e))throw new n("matrix is required");
            return i(t) ? (t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t[3] = -e[3], t[4] = -e[4], t[5] = -e[5], t[6] = -e[6], t[7] = -e[7], t[8] = -e[8], t[9] = -e[9], t[10] = -e[10], t[11] = -e[11], t[12] = -e[12], t[13] = -e[13], t[14] = -e[14], t[15] = -e[15], t) : new h(-e[0], -e[4], -e[8], -e[12], -e[1], -e[5], -e[9], -e[13], -e[2], -e[6], -e[10], -e[14], -e[3], -e[7], -e[11], -e[15])
        }, h.transpose = function (e, t) {
            if (!i(e))throw new n("matrix is required");
            if (!i(t))return new h(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]);
            var r = e[1], o = e[2], a = e[3], u = e[6], s = e[7], c = e[11];
            return t[0] = e[0], t[1] = e[4], t[2] = e[8], t[3] = e[12], t[4] = r, t[5] = e[5], t[6] = e[9], t[7] = e[13], t[8] = o, t[9] = u, t[10] = e[10], t[11] = e[14], t[12] = a, t[13] = s, t[14] = c, t[15] = e[15], t
        }, h.equals = function (e, t) {
            return e === t || i(e) && i(t) && e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3] && e[4] === t[4] && e[5] === t[5] && e[6] === t[6] && e[7] === t[7] && e[8] === t[8] && e[9] === t[9] && e[10] === t[10] && e[11] === t[11] && e[12] === t[12] && e[13] === t[13] && e[14] === t[14] && e[15] === t[15]
        }, h.equalsEpsilon = function (e, t, r) {
            if ("number" != typeof r)throw new n("epsilon is required and must be a number");
            return e === t || i(e) && i(t) && Math.abs(e[0] - t[0]) <= r && Math.abs(e[1] - t[1]) <= r && Math.abs(e[2] - t[2]) <= r && Math.abs(e[3] - t[3]) <= r && Math.abs(e[4] - t[4]) <= r && Math.abs(e[5] - t[5]) <= r && Math.abs(e[6] - t[6]) <= r && Math.abs(e[7] - t[7]) <= r && Math.abs(e[8] - t[8]) <= r && Math.abs(e[9] - t[9]) <= r && Math.abs(e[10] - t[10]) <= r && Math.abs(e[11] - t[11]) <= r && Math.abs(e[12] - t[12]) <= r && Math.abs(e[13] - t[13]) <= r && Math.abs(e[14] - t[14]) <= r && Math.abs(e[15] - t[15]) <= r
        }, h.getTranslation = function (t, r) {
            if (!i(t))throw new n("matrix is required");
            return i(r) ? (r.x = t[12], r.y = t[13], r.z = t[14], r) : new e(t[12], t[13], t[14])
        }, h.getRotation = function (e, t) {
            if (!i(e))throw new n("matrix is required");
            return i(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[4], t[4] = e[5], t[5] = e[6], t[6] = e[8], t[7] = e[9], t[8] = e[10], t) : new u(e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10])
        }, h.inverse = function (e, t) {
            if (!i(e))throw new n("matrix is required");
            var r = e[0], o = e[4], u = e[8], c = e[12], d = e[1], f = e[5], w = e[9], l = e[13], m = e[2], p = e[6], y = e[10], g = e[14], x = e[3], v = e[7], q = e[11], z = e[15], M = y * z, b = g * q, E = p * z, S = g * v, O = p * q, R = y * v, _ = m * z, T = g * x, I = m * q, P = y * x, C = m * v, N = p * x, U = M * f + S * w + O * l - (b * f + E * w + R * l), A = b * d + _ * w + P * l - (M * d + T * w + I * l), L = E * d + T * f + C * l - (S * d + _ * f + N * l), W = R * d + I * f + N * w - (O * d + P * f + C * w), D = b * o + E * u + R * c - (M * o + S * u + O * c), V = M * r + T * u + I * c - (b * r + _ * u + P * c), B = S * r + _ * o + N * c - (E * r + T * o + C * c), j = O * r + P * o + C * u - (R * r + I * o + N * u);
            M = u * l, b = c * w, E = o * l, S = c * f, O = o * w, R = u * f, _ = r * l, T = c * d, I = r * w, P = u * d, C = r * f, N = o * d;
            var k = M * v + S * q + O * z - (b * v + E * q + R * z), H = b * x + _ * q + P * z - (M * x + T * q + I * z), F = E * x + T * v + C * z - (S * x + _ * v + N * z), G = R * x + I * v + N * q - (O * x + P * v + C * q), Z = E * y + R * g + b * p - (O * g + M * p + S * y), Y = I * g + M * m + T * y - (_ * y + P * g + b * m), X = _ * p + N * g + S * m - (C * g + E * m + T * p), K = C * y + O * m + P * p - (I * p + N * y + R * m), J = r * U + o * A + u * L + c * W;
            if (Math.abs(J) < a.EPSILON20)throw new s("matrix is not invertible because its determinate is zero.");
            return J = 1 / J, i(t) ? (t[0] = U * J, t[1] = A * J, t[2] = L * J, t[3] = W * J, t[4] = D * J, t[5] = V * J, t[6] = B * J, t[7] = j * J, t[8] = k * J, t[9] = H * J, t[10] = F * J, t[11] = G * J, t[12] = Z * J, t[13] = Y * J, t[14] = X * J, t[15] = K * J, t) : new h(U * J, D * J, k * J, Z * J, A * J, V * J, H * J, Y * J, L * J, B * J, F * J, X * J, W * J, j * J, G * J, K * J)
        }, h.inverseTransformation = function (e, t) {
            if (!i(e))throw new n("matrix is required");
            var r = e[0], o = e[1], a = e[2], u = e[4], s = e[5], c = e[6], d = e[8], f = e[9], w = e[10], l = e[12], m = e[13], p = e[14], y = -r * l - o * m - a * p, g = -u * l - s * m - c * p, x = -d * l - f * m - w * p;
            return i(t) ? (t[0] = r, t[1] = u, t[2] = d, t[3] = 0, t[4] = o, t[5] = s, t[6] = f, t[7] = 0, t[8] = a, t[9] = c, t[10] = w, t[11] = 0, t[12] = y, t[13] = g, t[14] = x, t[15] = 1, t) : new h(r, o, a, y, u, s, c, g, d, f, w, x, 0, 0, 0, 1)
        }, h.IDENTITY = o(new h(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)), h.COLUMN0ROW0 = 0, h.COLUMN0ROW1 = 1, h.COLUMN0ROW2 = 2, h.COLUMN0ROW3 = 3, h.COLUMN1ROW0 = 4, h.COLUMN1ROW1 = 5, h.COLUMN1ROW2 = 6, h.COLUMN1ROW3 = 7, h.COLUMN2ROW0 = 8, h.COLUMN2ROW1 = 9, h.COLUMN2ROW2 = 10, h.COLUMN2ROW3 = 11, h.COLUMN3ROW0 = 12, h.COLUMN3ROW1 = 13, h.COLUMN3ROW2 = 14, h.COLUMN3ROW3 = 15, h.prototype.clone = function (e) {
            return h.clone(this, e)
        }, h.prototype.equals = function (e) {
            return h.equals(this, e)
        }, h.prototype.equalsEpsilon = function (e, t) {
            return h.equalsEpsilon(this, e, t)
        }, h.prototype.toString = function () {
            return "(" + this[0] + ", " + this[4] + ", " + this[8] + ", " + this[12] + ")\n" + "(" + this[1] + ", " + this[5] + ", " + this[9] + ", " + this[13] + ")\n" + "(" + this[2] + ", " + this[6] + ", " + this[10] + ", " + this[14] + ")\n" + "(" + this[3] + ", " + this[7] + ", " + this[11] + ", " + this[15] + ")"
        }, h
    }), define("Core/BoundingSphere", ["./defaultValue", "./defined", "./DeveloperError", "./Cartesian3", "./Cartesian4", "./Cartographic", "./Ellipsoid", "./GeographicProjection", "./Intersect", "./Interval", "./Matrix4"], function (e, t, r, i, n, o, a, u, s, h, c) {
        "use strict";
        var d = function (t, r) {
            this.center = i.clone(e(t, i.ZERO)), this.radius = e(r, 0)
        }, f = new i, w = new i, l = new i, m = new i, p = new i, y = new i, g = new i, x = new i, v = new i, q = new i, z = new i, M = new i;
        d.fromPoints = function (e, r) {
            if (t(r) || (r = new d), !t(e) || 0 === e.length)return r.center = i.clone(i.ZERO, r.center), r.radius = 0, r;
            for (var n = i.clone(e[0], g), o = i.clone(n, f), a = i.clone(n, w), u = i.clone(n, l), s = i.clone(n, m), h = i.clone(n, p), c = i.clone(n, y), b = e.length, E = 1; b > E; E++) {
                i.clone(e[E], n);
                var S = n.x, O = n.y, R = n.z;
                S < o.x && i.clone(n, o), S > s.x && i.clone(n, s), O < a.y && i.clone(n, a), O > h.y && i.clone(n, h), R < u.z && i.clone(n, u), R > c.z && i.clone(n, c)
            }
            var _ = i.magnitudeSquared(i.subtract(s, o, x)), T = i.magnitudeSquared(i.subtract(h, a, x)), I = i.magnitudeSquared(i.subtract(c, u, x)), P = o, C = s, N = _;
            T > N && (N = T, P = a, C = h), I > N && (N = I, P = u, C = c);
            var U = v;
            U.x = .5 * (P.x + C.x), U.y = .5 * (P.y + C.y), U.z = .5 * (P.z + C.z);
            var A = i.magnitudeSquared(i.subtract(C, U, x)), L = Math.sqrt(A), W = q;
            W.x = o.x, W.y = a.y, W.z = u.z;
            var D = z;
            D.x = s.x, D.y = h.y, D.z = c.z;
            var V = i.multiplyByScalar(i.add(W, D, x), .5, M), B = 0;
            for (E = 0; b > E; E++) {
                i.clone(e[E], n);
                var j = i.magnitude(i.subtract(n, V, x));
                j > B && (B = j);
                var k = i.magnitudeSquared(i.subtract(n, U, x));
                if (k > A) {
                    var H = Math.sqrt(k);
                    L = .5 * (L + H), A = L * L;
                    var F = H - L;
                    U.x = (L * U.x + F * n.x) / H, U.y = (L * U.y + F * n.y) / H, U.z = (L * U.z + F * n.z) / H
                }
            }
            return B > L ? (i.clone(U, r.center), r.radius = L) : (i.clone(V, r.center), r.radius = B), r
        };
        var b = new u, E = new i, S = new i, O = new o, R = new o;
        d.fromExtent2D = function (e, t, r) {
            return d.fromExtentWithHeights2D(e, t, 0, 0, r)
        }, d.fromExtentWithHeights2D = function (r, n, o, a, u) {
            if (t(u) || (u = new d), !t(r))return u.center = i.clone(i.ZERO, u.center), u.radius = 0, u;
            n = e(n, b), r.getSouthwest(O), O.height = o, r.getNortheast(R), R.height = a;
            var s = n.project(O, E), h = n.project(R, S), c = h.x - s.x, f = h.y - s.y, w = h.z - s.z;
            u.radius = .5 * Math.sqrt(c * c + f * f + w * w);
            var l = u.center;
            return l.x = s.x + .5 * c, l.y = s.y + .5 * f, l.z = s.z + .5 * w, u
        };
        var _ = [];
        d.fromExtent3D = function (r, i, n, o) {
            i = e(i, a.WGS84), n = e(n, 0);
            var u;
            return t(r) && (u = r.subsample(i, n, _)), d.fromPoints(u, o)
        }, d.fromVertices = function (n, o, a, u) {
            if (t(u) || (u = new d), !t(n) || 0 === n.length)return u.center = i.clone(i.ZERO, u.center), u.radius = 0, u;
            if (o = e(o, i.ZERO), a = e(a, 3), 3 > a)throw new r("stride must be 3 or greater.");
            var s = g;
            s.x = n[0] + o.x, s.y = n[1] + o.y, s.z = n[2] + o.z;
            for (var h = i.clone(s, f), c = i.clone(s, w), b = i.clone(s, l), E = i.clone(s, m), S = i.clone(s, p), O = i.clone(s, y), R = n.length, _ = 0; R > _; _ += a) {
                var T = n[_] + o.x, I = n[_ + 1] + o.y, P = n[_ + 2] + o.z;
                s.x = T, s.y = I, s.z = P, T < h.x && i.clone(s, h), T > E.x && i.clone(s, E), I < c.y && i.clone(s, c), I > S.y && i.clone(s, S), P < b.z && i.clone(s, b), P > O.z && i.clone(s, O)
            }
            var C = i.magnitudeSquared(i.subtract(E, h, x)), N = i.magnitudeSquared(i.subtract(S, c, x)), U = i.magnitudeSquared(i.subtract(O, b, x)), A = h, L = E, W = C;
            N > W && (W = N, A = c, L = S), U > W && (W = U, A = b, L = O);
            var D = v;
            D.x = .5 * (A.x + L.x), D.y = .5 * (A.y + L.y), D.z = .5 * (A.z + L.z);
            var V = i.magnitudeSquared(i.subtract(L, D, x)), B = Math.sqrt(V), j = q;
            j.x = h.x, j.y = c.y, j.z = b.z;
            var k = z;
            k.x = E.x, k.y = S.y, k.z = O.z;
            var H = i.multiplyByScalar(i.add(j, k, x), .5, M), F = 0;
            for (_ = 0; R > _; _ += a) {
                s.x = n[_] + o.x, s.y = n[_ + 1] + o.y, s.z = n[_ + 2] + o.z;
                var G = i.magnitude(i.subtract(s, H, x));
                G > F && (F = G);
                var Z = i.magnitudeSquared(i.subtract(s, D, x));
                if (Z > V) {
                    var Y = Math.sqrt(Z);
                    B = .5 * (B + Y), V = B * B;
                    var X = Y - B;
                    D.x = (B * D.x + X * s.x) / Y, D.y = (B * D.y + X * s.y) / Y, D.z = (B * D.z + X * s.z) / Y
                }
            }
            return F > B ? (i.clone(D, u.center), u.radius = B) : (i.clone(H, u.center), u.radius = F), u
        }, d.fromCornerPoints = function (e, n, o) {
            if (!t(e) || !t(n))throw new r("corner and oppositeCorner are required.");
            t(o) || (o = new d);
            var a = o.center;
            return i.add(e, n, a), i.multiplyByScalar(a, .5, a), o.radius = i.distance(a, n), o
        }, d.fromEllipsoid = function (e, n) {
            if (!t(e))throw new r("ellipsoid is required.");
            return t(n) || (n = new d), i.clone(i.ZERO, n.center), n.radius = e.getMaximumRadius(), n
        }, d.clone = function (e, r) {
            return t(e) ? t(r) ? (r.center = i.clone(e.center, r.center), r.radius = e.radius, r) : new d(e.center, e.radius) : void 0
        };
        var T = new i, I = new i;
        d.union = function (e, n, o) {
            if (!t(e))throw new r("left is required.");
            if (!t(n))throw new r("right is required.");
            t(o) || (o = new d);
            var a = e.center, u = n.center;
            i.add(a, u, I);
            var s = i.multiplyByScalar(I, .5, I), h = i.magnitude(i.subtract(a, s, T)) + e.radius, c = i.magnitude(i.subtract(u, s, T)) + n.radius;
            return o.radius = Math.max(h, c), i.clone(s, o.center), o
        };
        var P = new i;
        d.expand = function (e, n, o) {
            if (!t(e))throw new r("sphere is required.");
            if (!t(n))throw new r("point is required.");
            o = d.clone(e, o);
            var a = i.magnitude(i.subtract(n, o.center, P));
            return a > o.radius && (o.radius = a), o
        }, d.intersect = function (e, n) {
            if (!t(e))throw new r("sphere is required.");
            if (!t(n))throw new r("plane is required.");
            var o = e.center, a = e.radius, u = i.dot(n, o) + n.w;
            return -a > u ? s.OUTSIDE : a > u ? s.INTERSECTING : s.INSIDE
        };
        var C = n.clone(n.UNIT_W), N = new i;
        d.transform = function (e, n, o) {
            if (!t(e))throw new r("sphere is required.");
            if (!t(n))throw new r("transform is required.");
            return t(o) || (o = new d), c.multiplyByPoint(n, e.center, C), o.center = i.clone(C, o.center), o.radius = Math.max(i.magnitude(c.getColumn(n, 0, N)), i.magnitude(c.getColumn(n, 1, N)), i.magnitude(c.getColumn(n, 2, N))) * e.radius, o
        };
        var U = new i;
        d.getPlaneDistances = function (e, n, o, a) {
            if (!t(e))throw new r("sphere is required.");
            if (!t(n))throw new r("position is required.");
            if (!t(o))throw new r("direction is required.");
            t(a) || (a = new h);
            var u = i.subtract(e.center, n, U), s = i.multiplyByScalar(o, i.dot(o, u), U), c = i.magnitude(s);
            return a.start = c - e.radius, a.stop = c + e.radius, a
        };
        for (var A = new i, L = new i, W = new i, D = new i, V = new i, B = new o, j = new Array(8), k = 0; 8 > k; ++k)j[k] = new i;
        var H = new u;
        return d.projectTo2D = function (n, o, a) {
            if (!t(n))throw new r("sphere is required.");
            o = e(o, H);
            var u = o.getEllipsoid(), s = n.center, h = n.radius, c = u.geodeticSurfaceNormal(s, A), f = i.cross(i.UNIT_Z, c, L);
            i.normalize(f, f);
            var w = i.cross(c, f, W);
            i.normalize(w, w), i.multiplyByScalar(c, h, c), i.multiplyByScalar(w, h, w), i.multiplyByScalar(f, h, f);
            var l = i.negate(w, V), m = i.negate(f, D), p = j, y = p[0];
            i.add(c, w, y), i.add(y, f, y), y = p[1], i.add(c, w, y), i.add(y, m, y), y = p[2], i.add(c, l, y), i.add(y, m, y), y = p[3], i.add(c, l, y), i.add(y, f, y), i.negate(c, c), y = p[4], i.add(c, w, y), i.add(y, f, y), y = p[5], i.add(c, w, y), i.add(y, m, y), y = p[6], i.add(c, l, y), i.add(y, m, y), y = p[7], i.add(c, l, y), i.add(y, f, y);
            for (var g = p.length, x = 0; g > x; ++x) {
                var v = p[x];
                i.add(s, v, v);
                var q = u.cartesianToCartographic(v, B);
                o.project(q, v)
            }
            a = d.fromPoints(p, a), s = a.center;
            var z = s.x, M = s.y, b = s.z;
            return s.x = b, s.y = z, s.z = M, a
        }, d.equals = function (e, r) {
            return e === r || t(e) && t(r) && i.equals(e.center, r.center) && e.radius === r.radius
        }, d.prototype.clone = function (e) {
            return d.clone(this, e)
        }, d.prototype.union = function (e, t) {
            return d.union(this, e, t)
        }, d.prototype.expand = function (e, t) {
            return d.expand(this, e, t)
        }, d.prototype.intersect = function (e) {
            return d.intersect(this, e)
        }, d.prototype.transform = function (e, t) {
            return d.transform(this, e, t)
        }, d.prototype.getPlaneDistances = function (e, t, r) {
            return d.getPlaneDistances(this, e, t, r)
        }, d.prototype.projectTo2D = function (e, t) {
            return d.projectTo2D(this, e, t)
        }, d.prototype.equals = function (e) {
            return d.equals(this, e)
        }, d
    }), define("Core/EllipsoidalOccluder", ["./defaultValue", "./defined", "./DeveloperError", "./Cartesian3", "./BoundingSphere"], function (e, t, r, i, n) {
        "use strict";
        function o(e, t, r) {
            var n = e.transformPositionToScaledSpace(t, f), o = i.magnitudeSquared(n), a = Math.sqrt(o), u = i.divideByScalar(n, a, w);
            o = Math.max(1, o), a = Math.max(1, a);
            var s = i.dot(u, r), h = i.magnitude(i.cross(u, r)), c = 1 / a, d = Math.sqrt(o - 1) * c;
            return 1 / (s * c - h * d)
        }

        function a(e, t, r) {
            return 0 >= t || t === 1 / 0 || t !== t ? void 0 : i.multiplyByScalar(e, t, r)
        }

        function u(e, t) {
            return e.transformPositionToScaledSpace(t, l), i.normalize(l, l)
        }

        var s = function (e, n) {
            if (!t(e))throw new r("ellipsoid is required.");
            this._ellipsoid = e, this._cameraPosition = new i, this._cameraPositionInScaledSpace = new i, this._distanceToLimbInScaledSpaceSquared = 0, t(n) && this.setCameraPosition(n)
        };
        s.prototype.getEllipsoid = function () {
            return this._ellipsoid
        }, s.prototype.setCameraPosition = function (e) {
            var t = this._ellipsoid, r = t.transformPositionToScaledSpace(e, this._cameraPositionInScaledSpace), n = i.magnitudeSquared(r) - 1;
            i.clone(e, this._cameraPosition), this._cameraPositionInScaledSpace = r, this._distanceToLimbInScaledSpaceSquared = n
        }, s.prototype.getCameraPosition = function () {
            return this._cameraPosition
        };
        var h = new i;
        s.prototype.isPointVisible = function (e) {
            var t = this._ellipsoid, r = t.transformPositionToScaledSpace(e, h);
            return this.isScaledSpacePointVisible(r)
        }, s.prototype.isScaledSpacePointVisible = function (e) {
            var t = this._cameraPositionInScaledSpace, r = this._distanceToLimbInScaledSpaceSquared, n = i.subtract(e, t, h), o = -i.dot(n, t), a = o > r && o * o / i.magnitudeSquared(n) > r;
            return !a
        }, s.prototype.computeHorizonCullingPoint = function (e, i, n) {
            if (!t(e))throw new r("directionToPoint is required");
            if (!t(i))throw new r("positions is required");
            for (var s = this._ellipsoid, h = u(s, e), c = 0, d = 0, f = i.length; f > d; ++d) {
                var w = i[d], l = o(s, w, h);
                c = Math.max(c, l)
            }
            return a(h, c, n)
        };
        var c = new i;
        s.prototype.computeHorizonCullingPointFromVertices = function (n, s, h, d, f) {
            if (!t(n))throw new r("directionToPoint is required");
            if (!t(s))throw new r("vertices is required");
            if (!t(h))throw new r("stride is required");
            d = e(d, i.ZERO);
            for (var w = this._ellipsoid, l = u(w, n), m = 0, p = 0, y = s.length; y > p; p += h) {
                c.x = s[p] + d.x, c.y = s[p + 1] + d.y, c.z = s[p + 2] + d.z;
                var g = o(w, c, l);
                m = Math.max(m, g)
            }
            return a(l, m, f)
        };
        var d = [];
        s.prototype.computeHorizonCullingPointFromExtent = function (e, o, a) {
            if (!t(e))throw new r("extent is required.");
            var u = e.subsample(o, 0, d), s = n.fromPoints(u);
            return i.magnitude(s.center) < .1 * o.getMinimumRadius() ? void 0 : this.computeHorizonCullingPoint(s.center, u, a)
        };
        var f = new i, w = new i, l = new i;
        return s
    }), define("Core/Extent", ["./freezeObject", "./defaultValue", "./defined", "./Ellipsoid", "./Cartographic", "./DeveloperError", "./Math"], function (e, t, r, i, n, o, a) {
        "use strict";
        var u = function (e, r, i, n) {
            this.west = t(e, 0), this.south = t(r, 0), this.east = t(i, 0), this.north = t(n, 0)
        };
        u.fromDegrees = function (e, i, n, o, s) {
            return e = a.toRadians(t(e, 0)), i = a.toRadians(t(i, 0)), n = a.toRadians(t(n, 0)), o = a.toRadians(t(o, 0)), r(s) ? (s.west = e, s.south = i, s.east = n, s.north = o, s) : new u(e, i, n, o)
        }, u.fromCartographicArray = function (e, t) {
            if (!r(e))throw new o("cartographics is required.");
            for (var i = Number.MAX_VALUE, n = -Number.MAX_VALUE, a = Number.MAX_VALUE, s = -Number.MAX_VALUE, h = 0, c = e.length; c > h; h++) {
                var d = e[h];
                i = Math.min(i, d.longitude), n = Math.max(n, d.longitude), a = Math.min(a, d.latitude), s = Math.max(s, d.latitude)
            }
            return r(t) ? (t.west = i, t.south = a, t.east = n, t.north = s, t) : new u(i, a, n, s)
        }, u.clone = function (e, t) {
            return r(e) ? r(t) ? (t.west = e.west, t.south = e.south, t.east = e.east, t.north = e.north, t) : new u(e.west, e.south, e.east, e.north) : void 0
        }, u.prototype.clone = function (e) {
            return u.clone(this, e)
        }, u.prototype.equals = function (e) {
            return u.equals(this, e)
        }, u.equals = function (e, t) {
            return e === t || r(e) && r(t) && e.west === t.west && e.south === t.south && e.east === t.east && e.north === t.north
        }, u.prototype.equalsEpsilon = function (e, t) {
            if ("number" != typeof t)throw new o("epsilon is required and must be a number.");
            return r(e) && Math.abs(this.west - e.west) <= t && Math.abs(this.south - e.south) <= t && Math.abs(this.east - e.east) <= t && Math.abs(this.north - e.north) <= t
        }, u.prototype.validate = function () {
            var e = this.north;
            if ("number" != typeof e)throw new o("north is required to be a number.");
            if (e < -a.PI_OVER_TWO || e > a.PI_OVER_TWO)throw new o("north must be in the interval [-Pi/2, Pi/2].");
            var t = this.south;
            if ("number" != typeof t)throw new o("south is required to be a number.");
            if (t < -a.PI_OVER_TWO || t > a.PI_OVER_TWO)throw new o("south must be in the interval [-Pi/2, Pi/2].");
            var r = this.west;
            if ("number" != typeof r)throw new o("west is required to be a number.");
            if (r < -Math.PI || r > Math.PI)throw new o("west must be in the interval [-Pi, Pi].");
            var i = this.east;
            if ("number" != typeof i)throw new o("east is required to be a number.");
            if (i < -Math.PI || i > Math.PI)throw new o("east must be in the interval [-Pi, Pi].")
        }, u.prototype.getSouthwest = function (e) {
            return r(e) ? (e.longitude = this.west, e.latitude = this.south, e.height = 0, e) : new n(this.west, this.south)
        }, u.prototype.getNorthwest = function (e) {
            return r(e) ? (e.longitude = this.west, e.latitude = this.north, e.height = 0, e) : new n(this.west, this.north)
        }, u.prototype.getNortheast = function (e) {
            return r(e) ? (e.longitude = this.east, e.latitude = this.north, e.height = 0, e) : new n(this.east, this.north)
        }, u.prototype.getSoutheast = function (e) {
            return r(e) ? (e.longitude = this.east, e.latitude = this.south, e.height = 0, e) : new n(this.east, this.south)
        }, u.prototype.getCenter = function (e) {
            return r(e) ? (e.longitude = .5 * (this.west + this.east), e.latitude = .5 * (this.south + this.north), e.height = 0, e) : new n(.5 * (this.west + this.east), .5 * (this.south + this.north))
        }, u.prototype.intersectWith = function (e, t) {
            if (!r(e))throw new o("otherExtent is required.");
            var i = Math.max(this.west, e.west), n = Math.max(this.south, e.south), a = Math.min(this.east, e.east), s = Math.min(this.north, e.north);
            return r(t) ? (t.west = i, t.south = n, t.east = a, t.north = s, t) : new u(i, n, a, s)
        }, u.prototype.contains = function (e) {
            if (!r(e))throw new o("cartographic is required.");
            return e.longitude >= this.west && e.longitude <= this.east && e.latitude >= this.south && e.latitude <= this.north
        }, u.prototype.isEmpty = function () {
            return this.west >= this.east || this.south >= this.north
        };
        var s = new n;
        return u.prototype.subsample = function (e, n, o) {
            e = t(e, i.WGS84), n = t(n, 0), r(o) || (o = []);
            var u = 0, h = this.north, c = this.south, d = this.east, f = this.west, w = s;
            w.height = n, w.longitude = f, w.latitude = h, o[u] = e.cartographicToCartesian(w, o[u]), u++, w.longitude = d, o[u] = e.cartographicToCartesian(w, o[u]), u++, w.latitude = c, o[u] = e.cartographicToCartesian(w, o[u]), u++, w.longitude = f, o[u] = e.cartographicToCartesian(w, o[u]), u++, w.latitude = 0 > h ? h : c > 0 ? c : 0;
            for (var l = 1; 8 > l; ++l) {
                var m = -Math.PI + l * a.PI_OVER_TWO;
                m > f && d > m && (w.longitude = m, o[u] = e.cartographicToCartesian(w, o[u]), u++)
            }
            return 0 === w.latitude && (w.longitude = f, o[u] = e.cartographicToCartesian(w, o[u]), u++, w.longitude = d, o[u] = e.cartographicToCartesian(w, o[u]), u++), o.length = u, o
        }, u.MAX_VALUE = e(new u(-Math.PI, -a.PI_OVER_TWO, Math.PI, a.PI_OVER_TWO)), u
    }), define("Core/HeightmapTessellator", ["./defaultValue", "./defined", "./freezeObject", "./DeveloperError", "./Cartesian3", "./Ellipsoid", "./Math"], function (e, t, r, i, n, o, a) {
        "use strict";
        var u = {};
        return u.DEFAULT_STRUCTURE = r({
            heightScale: 1,
            heightOffset: 0,
            elementsPerHeight: 1,
            stride: 1,
            elementMultiplier: 256,
            isBigEndian: !1
        }), u.computeVertices = function (r) {
            if (!t(r) || !t(r.heightmap))throw new i("description.heightmap is required.");
            if (!t(r.width) || !t(r.height))throw new i("description.width and description.height are required.");
            if (!t(r.vertices))throw new i("description.vertices is required.");
            if (!t(r.nativeExtent))throw new i("description.nativeExtent is required.");
            if (!t(r.skirtHeight))throw new i("description.skirtHeight is required.");
            var s, h, c, d, f = Math.cos, w = Math.sin, l = Math.sqrt, m = Math.atan, p = Math.exp, y = a.PI_OVER_TWO, g = a.toRadians, x = r.vertices, v = r.heightmap, q = r.width, z = r.height, M = r.skirtHeight, b = e(r.isGeographic, !0), E = e(r.ellipsoid, o.WGS84), S = 1 / E.getMaximumRadius(), O = r.nativeExtent, R = r.extent;
            t(R) ? (s = R.west, h = R.south, c = R.east, d = R.north) : b ? (s = g(O.west), h = g(O.south), c = g(O.east), d = g(O.north)) : (s = O.west * S, h = y - 2 * m(p(-O.south * S)), c = O.east * S, d = y - 2 * m(p(-O.north * S)));
            var _ = e(r.relativeToCenter, n.ZERO), T = e(r.structure, u.DEFAULT_STRUCTURE), I = e(T.heightScale, u.DEFAULT_STRUCTURE.heightScale), P = e(T.heightOffset, u.DEFAULT_STRUCTURE.heightOffset), C = e(T.elementsPerHeight, u.DEFAULT_STRUCTURE.elementsPerHeight), N = e(T.stride, u.DEFAULT_STRUCTURE.stride), U = e(T.elementMultiplier, u.DEFAULT_STRUCTURE.elementMultiplier), A = e(T.isBigEndian, u.DEFAULT_STRUCTURE.isBigEndian), L = (O.east - O.west) / (q - 1), W = (O.north - O.south) / (z - 1), D = E.getRadiiSquared(), V = D.x, B = D.y, j = D.z, k = 0, H = 65536, F = -65536, G = 0, Z = z, Y = 0, X = q;
            M > 0 && (--G, ++Z, --Y, ++X);
            for (var K = G; Z > K; ++K) {
                var J = K;
                0 > J && (J = 0), J >= z && (J = z - 1);
                var Q = O.north - W * J;
                Q = b ? g(Q) : y - 2 * m(p(-Q * S));
                for (var $ = f(Q), et = w(Q), tt = j * et, rt = (Q - h) / (d - h), it = Y; X > it; ++it) {
                    var nt = it;
                    0 > nt && (nt = 0), nt >= q && (nt = q - 1);
                    var ot = O.west + L * nt;
                    b ? ot = g(ot) : ot *= S;
                    var at, ut = J * q * N + nt * N;
                    if (1 === C)at = v[ut]; else {
                        at = 0;
                        var st;
                        if (A)for (st = 0; C > st; ++st)at = at * U + v[ut + st]; else for (st = C - 1; st >= 0; --st)at = at * U + v[ut + st]
                    }
                    at = at * I + P, F = Math.max(F, at), H = Math.min(H, at), (it !== nt || K !== J) && (at -= M);
                    var ht = $ * f(ot), ct = $ * w(ot), dt = V * ht, ft = B * ct, wt = l(dt * ht + ft * ct + tt * et), lt = 1 / wt, mt = dt * lt, pt = ft * lt, yt = tt * lt;
                    x[k++] = mt + ht * at - _.x, x[k++] = pt + ct * at - _.y, x[k++] = yt + et * at - _.z, x[k++] = at;
                    var gt = (ot - s) / (c - s);
                    x[k++] = gt, x[k++] = rt
                }
            }
            return {maximumHeight: F, minimumHeight: H}
        }, u
    }), define("Workers/createTaskProcessorWorker", ["../Core/defaultValue", "../Core/defined"], function (e, t) {
        "use strict";
        var r = function (r) {
            var i, n = [], o = {id: void 0, result: void 0, error: void 0};
            return function (a) {
                var u = a.data;
                n.length = 0, o.id = u.id, o.error = void 0, o.result = void 0;
                try {
                    o.result = r(u.parameters, n)
                } catch (s) {
                    o.error = s
                }
                t(i) || (i = e(self.webkitPostMessage, self.postMessage));
                try {
                    i(o, n)
                } catch (s) {
                    o.result = void 0, o.error = "postMessage failed with error: " + s + "\n  with responseMessage: " + JSON.stringify(o), i(o)
                }
            }
        };
        return r
    }), define("Workers/createVerticesFromHeightmap", ["../Core/BoundingSphere", "../Core/Ellipsoid", "../Core/EllipsoidalOccluder", "../Core/Extent", "../Core/HeightmapTessellator", "./createTaskProcessorWorker"], function (e, t, r, i, n, o) {
        "use strict";
        function a(o, a) {
            var u = 6, s = o.width, h = o.height;
            o.skirtHeight > 0 && (s += 2, h += 2);
            var c = new Float32Array(s * h * u);
            a.push(c.buffer), o.ellipsoid = t.clone(o.ellipsoid), o.extent = i.clone(o.extent), o.vertices = c;
            var d = n.computeVertices(o), f = e.fromVertices(c, o.relativeToCenter, u), w = o.ellipsoid, l = new r(w), m = l.computeHorizonCullingPointFromVertices(o.relativeToCenter, c, u, o.relativeToCenter);
            return {
                vertices: c.buffer,
                numberOfAttributes: u,
                minimumHeight: d.minimumHeight,
                maximumHeight: d.maximumHeight,
                gridWidth: s,
                gridHeight: h,
                boundingSphere3D: f,
                occludeePointInScaledSpace: m
            }
        }

        return o(a)
    })
}();
