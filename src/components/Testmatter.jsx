import React from "react";
import Matter from "matter-js";

const Testmatter = (matterContainerRef) => {
  // module aliases
  let Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

  // create an engine
  let engine = Engine.create();

  console.log(matterContainerRef);

  // create a renderer
  let render = Render.create({
    element: matterContainerRef.current,
    engine: engine,
    options: {
      width: matterContainerRef.current.clientWidth,
      height: matterContainerRef.current.clientHeight,
      wireframes: false,
      background: "white",
      pixelRatio: 2,
    },
  });

  // create two boxes and a ground
  let boxA = Bodies.rectangle(400, 200, 80, 80);
  let boxB = Bodies.rectangle(450, 50, 80, 80);

  // Create the ceiling and boundaries
  const boundaryOptions = {
    isStatic: true,
    render: {
      visible: false,
    },
  };

  const ceiling = Matter.Bodies.rectangle(matterContainerRef.current.clientWidth / 2, 0, matterContainerRef.current.clientWidth, 10, boundaryOptions);
  const leftWall = Matter.Bodies.rectangle(0, matterContainerRef.current.clientHeight / 2, 10, matterContainerRef.current.clientHeight, boundaryOptions);
  const rightWall = Matter.Bodies.rectangle(matterContainerRef.current.clientWidth, matterContainerRef.current.clientHeight / 2, 10, matterContainerRef.current.clientHeight, boundaryOptions);

  // add all of the bodies to the world
  Composite.add(engine.world, [boxA, boxB, ceiling, leftWall, rightWall]);

  // run the renderer
  Render.run(render);

  // create runner
  let runner = Runner.create();

  // run the engine
  Runner.run(runner, engine);

  return <div>Testmatter</div>;
};

export default Testmatter;
