// https://nme.babylonjs.com/#M9T40G#3

var defmat = new BABYLON.NodeMaterial("node");
defmat.mode = BABYLON.NodeMaterialModes.Material;

// InputBlock
var position = new BABYLON.InputBlock("position");
position.visibleInInspector = false;
position.visibleOnFrame = false;
position.target = 1;
position.setAsAttribute("position");

// TransformBlock
var WorldPos = new BABYLON.TransformBlock("WorldPos");
WorldPos.visibleInInspector = false;
WorldPos.visibleOnFrame = false;
WorldPos.target = 1;
WorldPos.complementZ = 0;
WorldPos.complementW = 1;

// InputBlock
var World = new BABYLON.InputBlock("World");
World.visibleInInspector = false;
World.visibleOnFrame = false;
World.target = 1;
World.setAsSystemValue(BABYLON.NodeMaterialSystemValues.World);

// TransformBlock
var Worldnormal = new BABYLON.TransformBlock("World normal");
Worldnormal.visibleInInspector = false;
Worldnormal.visibleOnFrame = false;
Worldnormal.target = 1;
Worldnormal.complementZ = 0;
Worldnormal.complementW = 0;

// InputBlock
var normal = new BABYLON.InputBlock("normal");
normal.visibleInInspector = false;
normal.visibleOnFrame = false;
normal.target = 1;
normal.setAsAttribute("normal");

// VectorSplitterBlock
var N = new BABYLON.VectorSplitterBlock("N");
N.visibleInInspector = false;
N.visibleOnFrame = false;
N.target = 4;

// NormalizeBlock
var NNormalized = new BABYLON.NormalizeBlock("N Normalized");
NNormalized.visibleInInspector = false;
NNormalized.visibleOnFrame = false;
NNormalized.target = 4;

// DotBlock
var NDotL = new BABYLON.DotBlock("N Dot L");
NDotL.visibleInInspector = false;
NDotL.visibleOnFrame = false;
NDotL.target = 4;

// VectorMergerBlock
var VectorMerger = new BABYLON.VectorMergerBlock("VectorMerger");
VectorMerger.visibleInInspector = false;
VectorMerger.visibleOnFrame = false;
VectorMerger.target = 4;
VectorMerger.xSwizzle = "x";
VectorMerger.ySwizzle = "y";
VectorMerger.zSwizzle = "z";
VectorMerger.wSwizzle = "w";

// LightInformationBlock
var Lightinformation = new BABYLON.LightInformationBlock("Light information");
Lightinformation.visibleInInspector = false;
Lightinformation.visibleOnFrame = false;
Lightinformation.target = 1;

// AddBlock
var H = new BABYLON.AddBlock("H");
H.visibleInInspector = false;
H.visibleOnFrame = false;
H.target = 4;

// NormalizeBlock
var VNormalized = new BABYLON.NormalizeBlock("V (Normalized)");
VNormalized.visibleInInspector = false;
VNormalized.visibleOnFrame = false;
VNormalized.target = 4;

// ViewDirectionBlock
var Viewdirection = new BABYLON.ViewDirectionBlock("View direction");
Viewdirection.visibleInInspector = false;
Viewdirection.visibleOnFrame = false;
Viewdirection.target = 4;

// InputBlock
var cameraPosition = new BABYLON.InputBlock("cameraPosition");
cameraPosition.visibleInInspector = false;
cameraPosition.visibleOnFrame = false;
cameraPosition.target = 1;
cameraPosition.setAsSystemValue(BABYLON.NodeMaterialSystemValues.CameraPosition);

// DotBlock
var Dot = new BABYLON.DotBlock("Dot");
Dot.visibleInInspector = false;
Dot.visibleOnFrame = false;
Dot.target = 4;

// OneMinusBlock
var Oneminus = new BABYLON.OneMinusBlock("One minus");
Oneminus.visibleInInspector = false;
Oneminus.visibleOnFrame = false;
Oneminus.target = 4;

// SmoothStepBlock
var Smoothstep = new BABYLON.SmoothStepBlock("Smooth step");
Smoothstep.visibleInInspector = false;
Smoothstep.visibleOnFrame = false;
Smoothstep.target = 4;

// InputBlock
var Float = new BABYLON.InputBlock("Float");
Float.visibleInInspector = false;
Float.visibleOnFrame = false;
Float.target = 1;
Float.value = 0.58;
Float.min = 0;
Float.max = 1;
Float.isBoolean = false;
Float.matrixMode = 0;
Float.animationType = BABYLON.AnimatedInputBlockTypes.None;
Float.isConstant = false;

// InputBlock
var Float1 = new BABYLON.InputBlock("Float");
Float1.visibleInInspector = false;
Float1.visibleOnFrame = false;
Float1.target = 1;
Float1.value = 1;
Float1.min = 0;
Float1.max = 1;
Float1.isBoolean = false;
Float1.matrixMode = 0;
Float1.animationType = BABYLON.AnimatedInputBlockTypes.None;
Float1.isConstant = false;

// MultiplyBlock
var Multiply = new BABYLON.MultiplyBlock("Multiply");
Multiply.visibleInInspector = false;
Multiply.visibleOnFrame = false;
Multiply.target = 4;

// PowBlock
var Pow = new BABYLON.PowBlock("Pow");
Pow.visibleInInspector = false;
Pow.visibleOnFrame = false;
Pow.target = 4;

// InputBlock
var Float2 = new BABYLON.InputBlock("Float");
Float2.visibleInInspector = false;
Float2.visibleOnFrame = false;
Float2.target = 1;
Float2.value = 10;
Float2.min = 0;
Float2.max = 10;
Float2.isBoolean = false;
Float2.matrixMode = 0;
Float2.animationType = BABYLON.AnimatedInputBlockTypes.None;
Float2.isConstant = false;

// AddBlock
var Add = new BABYLON.AddBlock("Add");
Add.visibleInInspector = false;
Add.visibleOnFrame = false;
Add.target = 4;

// AddBlock
var Add1 = new BABYLON.AddBlock("Add");
Add1.visibleInInspector = false;
Add1.visibleOnFrame = false;
Add1.target = 4;

// AddBlock
var Add2 = new BABYLON.AddBlock("Add");
Add2.visibleInInspector = false;
Add2.visibleOnFrame = false;
Add2.target = 4;

// MultiplyBlock
var Multiply1 = new BABYLON.MultiplyBlock("Multiply");
Multiply1.visibleInInspector = false;
Multiply1.visibleOnFrame = false;
Multiply1.target = 4;

// VectorSplitterBlock
var VectorSplitter = new BABYLON.VectorSplitterBlock("VectorSplitter");
VectorSplitter.visibleInInspector = false;
VectorSplitter.visibleOnFrame = false;
VectorSplitter.target = 4;

// InputBlock
var color = new BABYLON.InputBlock("color");
color.visibleInInspector = false;
color.visibleOnFrame = false;
color.target = 1;
color.setAsAttribute("color");

// ScaleBlock
var Scale = new BABYLON.ScaleBlock("Scale");
Scale.visibleInInspector = false;
Scale.visibleOnFrame = false;
Scale.target = 4;

// InputBlock
var Color = new BABYLON.InputBlock("Color3");
Color.visibleInInspector = false;
Color.visibleOnFrame = false;
Color.target = 1;
Color.value = new BABYLON.Color3(0.7843137254901961, 0.7843137254901961, 0.7843137254901961);
Color.isConstant = false;

// SmoothStepBlock
var Smoothstep1 = new BABYLON.SmoothStepBlock("Smooth step");
Smoothstep1.visibleInInspector = false;
Smoothstep1.visibleOnFrame = false;
Smoothstep1.target = 4;

// InputBlock
var Float3 = new BABYLON.InputBlock("Float");
Float3.visibleInInspector = false;
Float3.visibleOnFrame = false;
Float3.target = 1;
Float3.value = 0.475;
Float3.min = 0;
Float3.max = 1;
Float3.isBoolean = false;
Float3.matrixMode = 0;
Float3.animationType = BABYLON.AnimatedInputBlockTypes.None;
Float3.isConstant = false;

// InputBlock
var Float4 = new BABYLON.InputBlock("Float");
Float4.visibleInInspector = false;
Float4.visibleOnFrame = false;
Float4.target = 1;
Float4.value = 0.525;
Float4.min = 0;
Float4.max = 1;
Float4.isBoolean = false;
Float4.matrixMode = 0;
Float4.animationType = BABYLON.AnimatedInputBlockTypes.None;
Float4.isConstant = false;

// MultiplyBlock
var SpecularFactor = new BABYLON.MultiplyBlock("Specular Factor");
SpecularFactor.visibleInInspector = false;
SpecularFactor.visibleOnFrame = false;
SpecularFactor.target = 4;

// DotBlock
var NDotH = new BABYLON.DotBlock("N Dot H");
NDotH.visibleInInspector = false;
NDotH.visibleOnFrame = false;
NDotH.target = 4;

// NormalizeBlock
var HNormalized = new BABYLON.NormalizeBlock("H Normalized");
HNormalized.visibleInInspector = false;
HNormalized.visibleOnFrame = false;
HNormalized.target = 4;

// PowBlock
var Pow1 = new BABYLON.PowBlock("Pow");
Pow1.visibleInInspector = false;
Pow1.visibleOnFrame = false;
Pow1.target = 4;

// MultiplyBlock
var Multiply2 = new BABYLON.MultiplyBlock("Multiply");
Multiply2.visibleInInspector = false;
Multiply2.visibleOnFrame = false;
Multiply2.target = 4;

// InputBlock
var Float5 = new BABYLON.InputBlock("Float");
Float5.visibleInInspector = false;
Float5.visibleOnFrame = false;
Float5.target = 1;
Float5.value = 10;
Float5.min = 0;
Float5.max = 10;
Float5.isBoolean = false;
Float5.matrixMode = 0;
Float5.animationType = BABYLON.AnimatedInputBlockTypes.None;
Float5.isConstant = false;

// SmoothStepBlock
var Smoothstep2 = new BABYLON.SmoothStepBlock("Smooth step");
Smoothstep2.visibleInInspector = false;
Smoothstep2.visibleOnFrame = false;
Smoothstep2.target = 4;

// InputBlock
var Float6 = new BABYLON.InputBlock("Float");
Float6.visibleInInspector = false;
Float6.visibleOnFrame = false;
Float6.target = 1;
Float6.value = 0.05;
Float6.min = 0;
Float6.max = 1;
Float6.isBoolean = false;
Float6.matrixMode = 0;
Float6.animationType = BABYLON.AnimatedInputBlockTypes.None;
Float6.isConstant = false;

// InputBlock
var Float7 = new BABYLON.InputBlock("Float");
Float7.visibleInInspector = false;
Float7.visibleOnFrame = false;
Float7.target = 1;
Float7.value = 0.5;
Float7.min = 0;
Float7.max = 1;
Float7.isBoolean = false;
Float7.matrixMode = 0;
Float7.animationType = BABYLON.AnimatedInputBlockTypes.None;
Float7.isConstant = false;

// InputBlock
var Ambient = new BABYLON.InputBlock("Ambient");
Ambient.visibleInInspector = false;
Ambient.visibleOnFrame = false;
Ambient.target = 1;
Ambient.value = new BABYLON.Color3(0.2, 0.2, 0.2);
Ambient.isConstant = false;

// FragmentOutputBlock
var FragmentOutput = new BABYLON.FragmentOutputBlock("FragmentOutput");
FragmentOutput.visibleInInspector = false;
FragmentOutput.visibleOnFrame = false;
FragmentOutput.target = 2;
FragmentOutput.convertToGammaSpace = false;
FragmentOutput.convertToLinearSpace = false;
FragmentOutput.useLogarithmicDepth = false;

// TransformBlock
var WorldPosViewProjectionTransform = new BABYLON.TransformBlock("WorldPos * ViewProjectionTransform");
WorldPosViewProjectionTransform.visibleInInspector = false;
WorldPosViewProjectionTransform.visibleOnFrame = false;
WorldPosViewProjectionTransform.target = 1;
WorldPosViewProjectionTransform.complementZ = 0;
WorldPosViewProjectionTransform.complementW = 1;

// InputBlock
var ViewProjection = new BABYLON.InputBlock("ViewProjection");
ViewProjection.visibleInInspector = false;
ViewProjection.visibleOnFrame = false;
ViewProjection.target = 1;
ViewProjection.setAsSystemValue(BABYLON.NodeMaterialSystemValues.ViewProjection);

// VertexOutputBlock
var VertexOutput = new BABYLON.VertexOutputBlock("VertexOutput");
VertexOutput.visibleInInspector = false;
VertexOutput.visibleOnFrame = false;
VertexOutput.target = 1;

// Connections
position.output.connectTo(WorldPos.vector);
World.output.connectTo(WorldPos.transform);
WorldPos.output.connectTo(WorldPosViewProjectionTransform.vector);
ViewProjection.output.connectTo(WorldPosViewProjectionTransform.transform);
WorldPosViewProjectionTransform.output.connectTo(VertexOutput.vector);
color.output.connectTo(VectorSplitter.xyzw);
VectorSplitter.xyzOut.connectTo(Multiply1.left);
Color.output.connectTo(Scale.input);
WorldPos.output.connectTo(Lightinformation.worldPosition);
Lightinformation.intensity.connectTo(VectorMerger.x);
Lightinformation.intensity.connectTo(VectorMerger.y);
Lightinformation.intensity.connectTo(VectorMerger.z);
VectorMerger.xyz.connectTo(NDotL.left);
normal.output.connectTo(Worldnormal.vector);
World.output.connectTo(Worldnormal.transform);
Worldnormal.output.connectTo(N.xyzw);
N.xyzOut.connectTo(NNormalized.input);
NNormalized.output.connectTo(NDotL.right);
NDotL.output.connectTo(Smoothstep1.value);
Float3.output.connectTo(Smoothstep1.edge0);
Float4.output.connectTo(Smoothstep1.edge1);
Smoothstep1.output.connectTo(Scale.factor);
Scale.output.connectTo(Multiply1.right);
Multiply1.output.connectTo(Add2.left);
Ambient.output.connectTo(Add2.right);
Add2.output.connectTo(Add1.left);
Smoothstep1.output.connectTo(SpecularFactor.left);
NNormalized.output.connectTo(NDotH.left);
VectorMerger.xyz.connectTo(H.left);
WorldPos.output.connectTo(Viewdirection.worldPosition);
cameraPosition.output.connectTo(Viewdirection.cameraPosition);
Viewdirection.output.connectTo(VNormalized.input);
VNormalized.output.connectTo(H.right);
H.output.connectTo(HNormalized.input);
HNormalized.output.connectTo(NDotH.right);
NDotH.output.connectTo(SpecularFactor.right);
SpecularFactor.output.connectTo(Pow1.value);
Float5.output.connectTo(Multiply2.left);
Float5.output.connectTo(Multiply2.right);
Multiply2.output.connectTo(Pow1.power);
Pow1.output.connectTo(Smoothstep2.value);
Float6.output.connectTo(Smoothstep2.edge0);
Float7.output.connectTo(Smoothstep2.edge1);
Smoothstep2.output.connectTo(Add1.right);
Add1.output.connectTo(Add.left);
NNormalized.output.connectTo(Dot.left);
VNormalized.output.connectTo(Dot.right);
Dot.output.connectTo(Oneminus.input);
Oneminus.output.connectTo(Smoothstep.value);
Float.output.connectTo(Smoothstep.edge0);
Float1.output.connectTo(Smoothstep.edge1);
Smoothstep.output.connectTo(Multiply.left);
NDotL.output.connectTo(Pow.value);
Float2.output.connectTo(Pow.power);
Pow.output.connectTo(Multiply.right);
Multiply.output.connectTo(Add.right);
Add.output.connectTo(FragmentOutput.rgb);

// Output nodes
defmat.addOutputNode(VertexOutput);
defmat.addOutputNode(FragmentOutput);
defmat.build();