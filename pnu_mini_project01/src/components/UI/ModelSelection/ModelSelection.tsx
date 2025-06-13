'use client'

import Button01 from "@/components/etc/Button01";
import { ModelConfig, ModelSize, ModelType} from "@/type/Model";

export default function ModelSelection({onclose} : {onclose : ()=>void}) {
    const ModelSelection: ModelConfig = { modelType:ModelType.seg , modelSize:ModelSize.x }
    return (
        <div>
            <Button01 caption="N" bg_color="blue" onClick={onclose} />
        </div>
    );
}