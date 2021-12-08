import Matrix, { vec4, vec3 } from "./Matrix.js"

export default class Operations {

    static x = ([x, , , ]: vec3 | vec4) => x
    static y = ([, y, , ]: vec3 | vec4) => y
    static z = ([, , z, ]: vec3 | vec4) => z
    static w = ([, , , w]: vec3 | vec4) => w
    static xyz = ([x, y, z, ]: vec3 | vec4): vec3 => [x, y, z]

    static sum  = ([x1, y1, z1]: vec3, [x2, y2, z2]: vec3): vec3 => [x1 + x2, y1 + y2, z1 + z2]
    static diff = ([x1, y1, z1]: vec3, [x2, y2, z2]: vec3): vec3 => [x1 - x2, y1 - y2, z1 - z2]

    static mul = ([x1, y1, z1]: vec3, [x2, y2, z2]: vec3): vec3 => [x1 * x2, y1 * y2, z1 * z2]
    static div = ([x1, y1, z1]: vec3, [x2, y2, z2]: vec3): vec3 => [x1 / x2, y1 / y2, z1 / z2]

    static dot = ([x1, y1, z1, w1]: vec3 | vec4, [x2, y2, z2, w2]: vec3 | vec4) => 
        x1*x2 + y1*y2 + z1*z2 + (w1*w2 || 0)

    static cross = ([x1, y1, z1]: vec3, [x2, y2, z2]: vec3): vec3 => [
        y1 * z2 - z1 * y2, 
        z1 * x2 - x1 * z2, 
        x1 * y2 - y1 * x2
    ]

    static center = ([ax, ay, az]: vec3, [bx, by, bz]: vec3, [cx, cy, cz]: vec3): vec3 => [
        (ax + bx + cx) / 3,
        (ay + by + cy) / 3,
        (az + bz + cz) / 3
    ]

    static len = (v: vec3 | vec4) => Math.sqrt(Operations.dot(v, v))

    static dist = ([x1, y1, z1]: vec3, [x2, y2, z2]: vec3) => 
        Operations.len([x2-x1, y2-y1, z2-z1, 0])

    static normalize = ([x, y, z]: vec3): vec3 => {
        const len = Operations.len([x, y, z])
        return [x/len, y/len, z/len]
    }

    static scale = ([x, y, z]: vec3, k: number): vec3 => [k*x, k*y, k*z]

    static reflect = (l: vec3, n: vec3) => 
        Operations.diff(Operations.scale(n, 2 * Operations.dot(l, n)), l)

    static mulMatrixVector = (M: Matrix, v: vec4): vec4 => [
        Operations.dot(M.row(0), v),
        Operations.dot(M.row(1), v),
        Operations.dot(M.row(2), v),
        Operations.dot(M.row(3), v)
    ]

    private static mulMatrixMatrix = (A: Matrix, B: Matrix) => Matrix.transposed(
        ...Operations.mulMatrixVector(A, B.col(0)),
        ...Operations.mulMatrixVector(A, B.col(1)),
        ...Operations.mulMatrixVector(A, B.col(2)),
        ...Operations.mulMatrixVector(A, B.col(3))
    )
    
    static mulMatrices = (...Ms: Matrix[]) =>
        Ms.reduce((prev, cur) => Operations.mulMatrixMatrix(prev, cur))

    static divPersp = ([x, y, z, w]: vec4): vec3 => [x/w, y/w, z]
    
}