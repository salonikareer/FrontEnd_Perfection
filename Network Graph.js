import React, { useState, useEffect, useRef, useCallback } from 'react';

const HistoricalFiguresNetwork = () => {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const canvasRef = useRef(null);

  const historicalFigures = [
    { id: 'Shakespeare', group: 1, info: 'English playwright and poet (1564-1616)', img: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Shakespeare.jpg' },
    { id: 'Newton', group: 2, info: 'English physicist and mathematician (1643-1727)', img: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Sir_Isaac_Newton_%281683%29.jpg' },
    { id: 'Galileo', group: 2, info: 'Italian astronomer and physicist (1564-1642)', img: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Justus_Sustermans_-_Portrait_of_Galileo_Galilei%2C_1636.jpg' },
    { id: 'Marie Curie', group: 2, info: 'Polish-French physicist and chemist (1867-1934)', img: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Marie_Curie_c1920.jpg' },
    { id: 'Leonardo da Vinci', group: 3, info: 'Italian polymath of the Renaissance (1452-1519)', img: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Leonardo_da_Vinci_-_presumed_self-portrait_-_WGA12798.jpg' },
    { id: 'Michelangelo', group: 3, info: 'Italian sculptor and painter (1475-1564)', img: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Michelangelo.jpg' },
    { id: 'Mozart', group: 4, info: 'Austrian composer (1756-1791)', img: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Wolfgang-amadeus-mozart_1.jpg' },
    { id: 'Beethoven', group: 4, info: 'German composer and pianist (1770-1827)', img: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Beethoven.jpg' },
    { id: 'Cleopatra', group: 5, info: 'Last active ruler of the Ptolemaic Kingdom of Egypt (69-30 BC)', img: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Cleopatra-VII-of-Egypt-Antikensammlung-Berlin.jpg' },
    { id: 'Julius Caesar', group: 5, info: 'Roman statesman and military general (100-44 BC)', img: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Gaius_Julius_Caesar_%28Vatican_Museum%29.jpg' },
  ];

  const connections = [
    { source: 'Shakespeare', target: 'Newton' },
    { source: 'Shakespeare', target: 'Leonardo da Vinci' },
    { source: 'Newton', target: 'Galileo' },
    { source: 'Galileo', target: 'Marie Curie' },
    { source: 'Leonardo da Vinci', target: 'Michelangelo' },
    { source: 'Mozart', target: 'Beethoven' },
    { source: 'Cleopatra', target: 'Julius Caesar' },
    { source: 'Julius Caesar', target: 'Shakespeare' },
    { source: 'Marie Curie', target: 'Mozart' },
    { source: 'Michelangelo', target: 'Newton' },
  ];

  useEffect(() => {
    const initialNodes = historicalFigures.map(figure => ({
      ...figure,
      x: Math.random() * 400 + 50,
      y: Math.random() * 400 + 50,
      vx: 0,
      vy: 0
    }));
    setNodes(initialNodes);
    setLinks(connections.map(conn => ({
      ...conn,
      source: initialNodes.find(n => n.id === conn.source),
      target: initialNodes.find(n => n.id === conn.target)
    })));
  }, []);

  const simulation = useCallback(() => {
    nodes.forEach(node => {
      node.vx *= 0.99;
      node.vy *= 0.99;
      node.x += node.vx;
      node.y += node.vy;
      if (node.x < 0 || node.x > 500) node.vx *= -1;
      if (node.y < 0 || node.y > 500) node.vy *= -1;
    });

    links.forEach(link => {
      const dx = link.target.x - link.source.x;
      const dy = link.target.y - link.source.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const force = (distance - 100) * 0.01;

      const fx = (dx / distance) * force;
      const fy = (dy / distance) * force;

      link.source.vx += fx;
      link.source.vy += fy;
      link.target.vx -= fx;
      link.target.vy -= fy;
    });

    setNodes([...nodes]);
  }, [nodes, links]);

  useEffect(() => {
    if (nodes.length === 0 || links.length === 0) return;

    const interval = setInterval(simulation, 20);
    return () => clearInterval(interval);
  }, [nodes, links, simulation]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw links
      ctx.strokeStyle = 'rgba(150, 150, 150, 0.5)';
      ctx.lineWidth = 1;
      links.forEach(link => {
        ctx.beginPath();
        ctx.moveTo(link.source.x, link.source.y);
        ctx.lineTo(link.target.x, link.target.y);
        ctx.stroke();
      });

      // Draw nodes with images
      nodes.forEach(node => {
        const img = new Image();
        img.src = node.img;
        img.onload = () => {
          ctx.drawImage(img, node.x - 15, node.y - 15, 30, 30); // Adjust size as necessary
        };

        // Node labels
        ctx.fillStyle = 'black';
        ctx.font = '10px Arial';
        ctx.fillText(node.id, node.x + 20, node.y + 4);
      });
    };

    draw();
  }, [nodes, links]);

  const handleCanvasClick = useCallback((event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const clickedNode = nodes.find(node => 
      Math.sqrt((node.x - x) ** 2 + (node.y - y) ** 2) < 15
    );

    setSelectedNode(clickedNode || null);
  }, [nodes]);

  return (
    <div className="p-4 max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <h2 className="text-2xl font-bold mb-4 text-center">Historical Figures Network</h2>
      <div className="flex flex-col md:flex-row">
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          onClick={handleCanvasClick}
          className="border rounded cursor-pointer"
        />
        <div className="md:ml-4 mt-4 md:mt-0 w-full md:w-1/2">
          <h3 className="text-xl font-semibold mb-2">Information</h3>
          {selectedNode ? (
            <div>
              <h4 className="text-lg font-medium">{selectedNode.id}</h4>
              <p>{selectedNode.info}</p>
              <h5 className="mt-2 font-medium">Connections:</h5>
              <ul>
                {links
                  .filter(link => link.source.id === selectedNode.id || link.target.id === selectedNode.id)
                  .map((link, index) => (
                    <li key={index}>
                      {link.source.id === selectedNode.id ? link.target.id : link.source.id}
                    </li>
                  ))
                }
              </ul>
            </div>
          ) : (
            <p>Click on a node to see information about the historical figure.</p>
          )}
        </div>
      </div>
      <p className="text-center mt-4 text-sm text-gray-600">
        This network demonstrates the interconnectedness of historical figures across different fields.
      </p>
    </div>
  );
};

export default HistoricalFiguresNetwork;
