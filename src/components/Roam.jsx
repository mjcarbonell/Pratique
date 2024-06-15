import React from 'react';
import { useGLTF } from '@react-three/drei';
import {
  CuboidCollider,
  RigidBody,
} from "@react-three/rapier";
import * as THREE from 'three';

export function Roam(props) {
  const { nodes, materials } = useGLTF('./models/roam/model.gltf');

  

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes['4lane'].geometry} material={materials['Material.005']} />
      <mesh geometry={nodes.Plane.geometry} material={materials.Material} />
      <mesh geometry={nodes.sidewalk1.geometry} material={materials['Material.015']} />
      <mesh geometry={nodes.sidewalk2.geometry} material={materials['Material.015']} />
      <mesh geometry={nodes.tmpzeuyzm5h001.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.eiffel.geometry} material={materials['Material.038']} />
      <mesh geometry={nodes.tmpzeuyzm5h003.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h004.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h005.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h006.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h008.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h009.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h010.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h011.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h012.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h013.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h014.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h015.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h016.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h017.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h018.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h019.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h020.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h021.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h022.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h023.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h024.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h025.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h026.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h027.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h028.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h029.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h030.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h031.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h032.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h033.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h034.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h035.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h036.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h037.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h038.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h039.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h040.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h041.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h042.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h043.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h044.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h045.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h046.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h047.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.Creperie.geometry} material={materials['Material.022']} />
      <mesh geometry={nodes.tmpzeuyzm5h049.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h050.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h051.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h052.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h053.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h054.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h055.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h056.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h057.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h058.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h059.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h060.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpzeuyzm5h061.geometry} material={materials['Material.017']} />
      <mesh geometry={nodes.tmpjxuqkcug004.geometry} material={materials['Material.009']} />
      <mesh geometry={nodes.tmpjxuqkcug004_1.geometry} material={materials['Material.004']} />
      <mesh geometry={nodes.tmpjxuqkcug004_2.geometry} material={materials['Material.007']} />
      <mesh geometry={nodes.tmpjxuqkcug004_3.geometry} material={materials['Material.008']} />
      <mesh geometry={nodes.tmpjxuqkcug004_4.geometry} material={materials['Material.016']} />
      <mesh geometry={nodes['BuildingMesh-00106006_1'].geometry} material={materials['Material.014']} />
      <mesh geometry={nodes['BuildingMesh-00106006_2'].geometry} material={materials['Material.013']} />
      <mesh geometry={nodes['BuildingMesh-00106006_3'].geometry} material={materials['Material.012']} />
      <mesh geometry={nodes['BuildingMesh-00106006_4'].geometry} material={materials['Material.003']} />
      <mesh geometry={nodes['BuildingMesh-00106006_5'].geometry} material={materials['Material.010']} />
      <mesh geometry={nodes['BuildingMesh-00106006_6'].geometry} material={materials['Material.011']} />
      <mesh geometry={nodes['BuildingMesh-00106006_7'].geometry} material={materials['Material.019']} />
      <mesh geometry={nodes['BuildingMesh-00106006_8'].geometry} material={materials['Material.020']} />
      <mesh geometry={nodes['BuildingMesh-00106006_9'].geometry} material={materials['BuildingMat-00115.006']} />
      <mesh geometry={nodes['BuildingMesh-00106006_10'].geometry} material={materials['Material.021']} />
      <mesh geometry={nodes['BuildingMesh-00106006_11'].geometry} material={materials['Material.023']} />
      <mesh geometry={nodes['BuildingMesh-00106006_12'].geometry} material={materials['Material.024']} />
      <mesh geometry={nodes['BuildingMesh-00106006_13'].geometry} material={materials['Material.025']} />
      <mesh geometry={nodes['BuildingMesh-00106006_14'].geometry} material={materials['Material.026']} />
      <mesh geometry={nodes['BuildingMesh-00106006_15'].geometry} material={materials['Material.027']} />
      <mesh geometry={nodes['BuildingMesh-00106006_16'].geometry} material={materials['Material.028']} />
      <mesh geometry={nodes['BuildingMesh-00106006_17'].geometry} material={materials['BuildingMat-00137.006']} />
      <mesh geometry={nodes['BuildingMesh-00106006_18'].geometry} material={materials['Material.029']} />
      <mesh geometry={nodes['BuildingMesh-00106006_19'].geometry} material={materials['BuildingMat-00141.006']} />
      <mesh geometry={nodes['BuildingMesh-00106006_20'].geometry} material={materials['Material.039']} />
      <mesh geometry={nodes['BuildingMesh-00106006_21'].geometry} material={materials['Material.031']} />
      <mesh geometry={nodes['BuildingMesh-00106006_22'].geometry} material={materials['BuildingMat-00152.006']} />
      <mesh geometry={nodes['BuildingMesh-00106006_23'].geometry} material={materials['Material.032']} />
      <mesh geometry={nodes['BuildingMesh-00106006_24'].geometry} material={materials['Material.033']} />
      <mesh geometry={nodes['BuildingMesh-00106006_25'].geometry} material={materials['Material.034']} />
      <mesh geometry={nodes['BuildingMesh-00106006_26'].geometry} material={materials['Material.035']} />
      <mesh geometry={nodes['BuildingMesh-00106006_27'].geometry} material={materials['BuildingMat-00157.006']} />
      <mesh geometry={nodes['BuildingMesh-00106006_28'].geometry} material={materials['Material.036']} />
      <mesh geometry={nodes['BuildingMesh-00106006_29'].geometry} material={materials['Material.037']} />
      <mesh geometry={nodes['BuildingMesh-00106006_30'].geometry} material={materials['BuildingMat-00163.006']} />
      <mesh geometry={nodes['BuildingMesh-00125006_1'].geometry} material={materials['BuildingMat-00125.006']} />
      <mesh geometry={nodes['BuildingMesh-00125006_2'].geometry} material={materials['BuildingMat-00107.006']} />
      <mesh geometry={nodes['BuildingMesh-00125006_3'].geometry} material={materials['Material.018']} />
      <mesh geometry={nodes['BuildingMesh-00125006_4'].geometry} material={materials['Material.030']} />
    </group>
  );
}

useGLTF.preload('./models/roam/model.gltf');
