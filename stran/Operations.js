import { Matrix } from "./Matrix.js";
export class Operations {
}
Operations.x = ([x, , ,]) => x;
Operations.y = ([, y, ,]) => y;
Operations.z = ([, , z,]) => z;
Operations.w = ([, , , w]) => w;
Operations.xyz = ([x, y, z,]) => [x, y, z];
Operations.pow = (a, b) => Math.pow(a, b);
Operations.max = (a, b) => a > b ? a : b;
Operations.sum = ([x1, y1, z1], [x2, y2, z2]) => [x1 + x2, y1 + y2, z1 + z2];
Operations.diff = ([x1, y1, z1], [x2, y2, z2]) => [x1 - x2, y1 - y2, z1 - z2];
Operations.mul = ([x1, y1, z1], [x2, y2, z2]) => [x1 * x2, y1 * y2, z1 * z2];
Operations.div = ([x1, y1, z1], [x2, y2, z2]) => [x1 / x2, y1 / y2, z1 / z2];
Operations.dot = ([x1, y1, z1, w1], [x2, y2, z2, w2]) => x1 * x2 + y1 * y2 + z1 * z2 + (w1 * w2 || 0);
Operations.cross = ([x1, y1, z1], [x2, y2, z2]) => [
    y1 * z2 - z1 * y2,
    z1 * x2 - x1 * z2,
    x1 * y2 - y1 * x2
];
Operations.center = ([ax, ay, az], [bx, by, bz], [cx, cy, cz]) => [
    (ax + bx + cx) / 3,
    (ay + by + cy) / 3,
    (az + bz + cz) / 3
];
Operations.len = (v) => Math.sqrt(Operations.dot(v, v));
Operations.dist = ([x1, y1, z1], [x2, y2, z2]) => Operations.len([x2 - x1, y2 - y1, z2 - z1, 0]);
Operations.normalize = ([x, y, z]) => {
    const len = Operations.len([x, y, z]);
    return [x / len, y / len, z / len];
};
Operations.scale = ([x, y, z], k) => [k * x, k * y, k * z];
Operations.reflect = (i, n) => Operations.diff(Operations.scale(n, 2 * Operations.dot(i, n)), i);
Operations.mulMatrixVector = (M, v) => [
    Operations.dot(M.row(0), v),
    Operations.dot(M.row(1), v),
    Operations.dot(M.row(2), v),
    Operations.dot(M.row(3), v)
];
Operations.mulMatrixMatrix = (A, B) => Matrix.transposed(...Operations.mulMatrixVector(A, B.col(0)), ...Operations.mulMatrixVector(A, B.col(1)), ...Operations.mulMatrixVector(A, B.col(2)), ...Operations.mulMatrixVector(A, B.col(3)));
Operations.mulMatrices = (...Ms) => Ms.reduce((prev, cur) => Operations.mulMatrixMatrix(prev, cur));
Operations.divPersp = ([x, y, z, w]) => [x / w, y / w, z];
