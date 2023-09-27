import { vec4, vec3 } from "./Matrix.js"
import { light, material } from "./Color.js"

export interface Scene {
    vertices: vec4[],
    normals: vec4[],
    triangles: vec3[],
    camera: {
        translation: vec3,
        rotation: vec3,
        perspective: number
    },
    model: {
        translation: vec3,
        rotation: vec3,
        scale: vec3
    },
    material: material,
    lights: light[]
}

export default class SceneReader {
    static readFromJson(json: string): Scene {
        try {
            const data = JSON.parse(json)

            let scene: Scene = {
                vertices: [],
                triangles: [],
                normals: [],
                camera: {
                    translation: [0, 0, 0],
                    rotation: [0, 0, 0],
                    perspective: 0
                },
                model: {
                    translation: [0, 0, 0],
                    rotation: [0, 0, 0],
                    scale: [0, 0, 0]
                },
                material: {
                    color: [0, 0, 0],
                    shininess: 0
                },
                lights: []
            }

            const v: number[] = data.vertices
            const t: number[] = data.indices
            const n: number[] = data.normals
            
            if (v.length % 3 != 0) throw new Error("invalid number of vertices:  " + v.length)
            if (t.length % 3 != 0) throw new Error("invalid number of triangles: " + t.length)

            for (let i = 0; i < v.length; i += 3) {
                const [vx, vy, vz] = v.slice(i, i+3)
                const [nx, ny, nz] = n.slice(i, i+3)
                scene.vertices.push([vx, vy, vz, 1])
                scene.normals.push([nx, ny, nz, 0])
            }
            
            for (let i = 0; i < t.length; i += 3) {
                const [a, b, c] = t.slice(i, i+3)
                scene.triangles.push([a, b, c])
            }

            scene.camera   = data.camera
            scene.model    = data.model
            scene.material = data.material
            scene.lights   = data.lights

            return scene
        }
        catch (error) {
            console.error(error)
            return null
        }
    }
}
