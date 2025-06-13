// type ModelType = "Detect" | "seg" | "Clasification";

export enum ModelSize {
    n = "yolo11n",
    m = "yolo11m",
    x = "yolo11x",
}
export enum ModelType {
    seg = "seg",
    detect = "detect",
}

export type ModelConfig={
    modelType:ModelType
    modelSize:ModelSize
}

interface Model{
    modelType:ModelType
    modelSize:ModelSize
}
