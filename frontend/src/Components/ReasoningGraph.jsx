import { useRef, useCallback, useMemo, useEffect } from "react";
import ForceGraph3D from "react-force-graph-3d";
import * as THREE from "three";
import { useResultStore } from "../store/useResultStore";

const NODE_TYPE_COLORS = {
  assumption: "#ff6b6b",
  inference: "#4ecdc4",
  calculation: "#ffd93d",
  decision: "#6c5ce7",
  conclusion: "#a8e6cf",
};

const EDGE_RELATION_COLORS = {
  depends_on: "rgba(255, 107, 107, 0.4)",
  leads_to: "rgba(78, 205, 196, 0.4)",
  supports: "rgba(255, 217, 61, 0.4)",
  verifies: "rgba(168, 230, 207, 0.4)",
};

export default function ReasoningGraph() {
  const graphRef = useRef();
  const res = useResultStore((state) => state.res);
  const setSelectedNode = useResultStore((state) => state.setSelectedNode);

  const graphData = useMemo(() => {
    if (!res?.reasoning_graph) {
      return { nodes: [], links: [] };
    }

    const { nodes, edges } = res.reasoning_graph;

    const graphNodes = nodes.map((node) => ({
      id: node.id,
      title: node.title,
      description: node.description,
      type: node.type,
      color: NODE_TYPE_COLORS[node.type] || "#ffffff",
    }));

    const graphLinks = edges.map((edge) => ({
      source: edge.from,
      target: edge.to,
      relation: edge.relation,
      color: EDGE_RELATION_COLORS[edge.relation] || "rgba(255,255,255,0.2)",
    }));

    return { nodes: graphNodes, links: graphLinks };
  }, [res]);

  useEffect(() => {
    if (graphRef.current && graphData.nodes.length > 0) {
      // Zoom to fit after data loads
      setTimeout(() => {
        graphRef.current.zoomToFit(800, 100);
      }, 500);
    }
  }, [graphData]);

  const handleNodeClick = useCallback(
    (node) => {
      setSelectedNode({
        id: node.id,
        title: node.title,
        description: node.description,
        type: node.type,
      });

      // Focus camera on clicked node
      if (graphRef.current) {
        const distance = 120;
        const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
        graphRef.current.cameraPosition(
          {
            x: node.x * distRatio,
            y: node.y * distRatio,
            z: node.z * distRatio,
          },
          node,
          1000
        );
      }
    },
    [setSelectedNode]
  );

  const nodeThreeObject = useCallback((node) => {
    const group = new THREE.Group();

    // Glowing sphere
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      color: node.color,
      transparent: true,
      opacity: 0.9,
      emissive: node.color,
      emissiveIntensity: 0.3,
    });
    const sphere = new THREE.Mesh(geometry, material);
    group.add(sphere);

    // Outer glow ring
    const ringGeometry = new THREE.RingGeometry(6, 8, 32);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: node.color,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    group.add(ring);

    // Text label
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 512;
    canvas.height = 64;
    ctx.fillStyle = "transparent";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold 28px Space Grotesk, sans-serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(node.title || node.id, 256, 40);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0.8,
    });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(40, 5, 1);
    sprite.position.set(0, 10, 0);
    group.add(sprite);

    return group;
  }, []);

  const linkThreeObject = useCallback((link) => {
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: createTextTexture(link.relation?.replace(/_/g, " ") || ""),
        transparent: true,
        opacity: 0.5,
      })
    );
    sprite.scale.set(24, 3, 1);
    return sprite;
  }, []);

  const linkPositionUpdate = useCallback((sprite, { start, end }) => {
    const mid = {
      x: (start.x + end.x) / 2,
      y: (start.y + end.y) / 2,
      z: (start.z + end.z) / 2,
    };
    Object.assign(sprite.position, mid);
  }, []);

  if (!res?.reasoning_graph || graphData.nodes.length === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-0">
      <ForceGraph3D
        ref={graphRef}
        graphData={graphData}
        backgroundColor="#000000"
        nodeThreeObject={nodeThreeObject}
        nodeThreeObjectExtend={false}
        onNodeClick={handleNodeClick}
        linkColor={(link) => link.color}
        linkWidth={1.5}
        linkOpacity={0.4}
        linkDirectionalArrowLength={4}
        linkDirectionalArrowRelPos={0.85}
        linkDirectionalArrowColor={(link) => link.color}
        linkThreeObjectExtend={true}
        linkThreeObject={linkThreeObject}
        linkPositionUpdate={linkPositionUpdate}
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={1.5}
        linkDirectionalParticleSpeed={0.005}
        linkDirectionalParticleColor={(link) => link.color}
        enableNodeDrag={true}
        enableNavigationControls={true}
        showNavInfo={false}
        warmupTicks={50}
        cooldownTicks={100}
      />
    </div>
  );
}

function createTextTexture(text) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 512;
  canvas.height = 64;
  ctx.fillStyle = "transparent";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "22px Space Grotesk, sans-serif";
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText(text, 256, 40);
  return new THREE.CanvasTexture(canvas);
}
