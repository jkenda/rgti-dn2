import Matrix, { vec3, vec4 } from "./Matrix.js"
import O from "./Operations.js"

export interface light {
    color: vec3,
    position: vec3
}

export interface material {
    color: vec3,
    shininess: number
}

export default class Color {

    _material: material
    _lights: light[]

    constructor(material: material, lights: light[]) {
        this._material = material
        this._lights   = lights
    }

    phong(vertexPosition: vec3, vertexNormal: vec3) {
        const material = this._material
        vertexNormal = O.normalize(vertexNormal)

        let oColor: vec3 = [0, 0, 0]

        this._lights.forEach(light => {
            const lightDir = O.normalize(O.diff(light.position, vertexPosition))
            const viewDir = O.normalize(O.scale(vertexPosition, -1))

            const reflectDir = O.reflect(O.scale(lightDir, -1), vertexNormal)

            const diff = Math.max(O.dot(vertexNormal, lightDir), 0.0)
            const spec = Math.pow(Math.max(O.dot(reflectDir, viewDir), 0.0), material.shininess)

            const color = O.scale(O.mul(material.color, light.color), diff + spec)

            oColor = O.sum(oColor, color)
        })

        return O.scale(oColor, 255)
    }

}