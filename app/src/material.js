import { gl } from './context.js';
import { Shaders } from './shaders.js';
import Texture from './texture.js';

class Material {
    constructor(data, resources) {
        const m = this;
        m.resources = resources;
        m.name = data.name;
        m.textures = data.textures;
        m.geomType = data.geomType;
        m.doDetail = data.doDetail ? data.doDetail : 0;
        m.detailMult = data.detailMult ? data.detailMult : 0;
        m.detailUVMult = data.detailUVMult ? data.detailUVMult : 0;
        m.doEmissive = data.doEmissive ? data.doEmissive : 0;
        m.textures.forEach((name) => {
            if (name === 'none') {
                return;
            }
            resources.load(name);
        });
    }

    bind() {
        const m = this;
        Shaders.geometry.setInt('colorSampler', 0);
        Shaders.geometry.setInt('detailSampler', 1);
        Shaders.geometry.setInt('emissiveSampler', 2);
        Shaders.geometry.setInt('geomType', m.geomType);
        Shaders.geometry.setInt('doDetail', m.doDetail);
        Shaders.geometry.setFloat('detailMult', m.detailMult);
        Shaders.geometry.setFloat('detailUVMult', m.detailUVMult);
        Shaders.geometry.setInt('doEmissive', m.doEmissive);

        let texUnit = 0;
        m.textures.forEach((name) => {
            if (name === 'none') {
                texUnit++;
                return;
            }
            const tex = m.resources.get(name);
            if (m.geomType === 3) {
                tex.setTextureWrapMode(gl.CLAMP_TO_EDGE);
            }
            tex.bind(gl.TEXTURE0 + texUnit);
            texUnit++;
        });
    }

    unBind() {
        let texUnit = 0;
        const m = this;
        m.textures.forEach((name) => {
            if (name === 'none') {
                texUnit++;
                return;
            }
            Texture.unBind(gl.TEXTURE0 + texUnit);
            texUnit++;
        });
    }
}

export { Material as default };