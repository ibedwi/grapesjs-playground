"use client";

import grapesjs, { Editor } from "grapesjs";
import GjsEditor from "@grapesjs/react";
import { PropsWithChildren } from "react";

export function GrapeJSProvider(props: PropsWithChildren) {
  const onEditor = (editor: Editor) => {
    console.log("Editor loaded", { editor });
  };

  return (
    <GjsEditor
      // Pass the core GrapesJS library to the wrapper (required).
      // You can also pass the CDN url (eg. "https://unpkg.com/grapesjs")
      grapesjs={grapesjs}
      // Load the GrapesJS CSS file asynchronously from URL.
      // This is an optional prop, you can always import the CSS directly in your JS if you wish.
      grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
      // GrapesJS init options
      options={{
        blockManager: {
          // appendTo: "#blocks",
          blocks: [
            {
              id: "section", // id is mandatory
              label: "<b>Section</b>", // You can use HTML/SVG inside labels
              attributes: { class: "gjs-block-section" },
              content: `<section>
            <h1>This is a simple title</h1>
            <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
          </section>`,
            },
            {
              id: "text",
              label: "Text",
              content: '<div data-gjs-type="text">Insert your text here</div>',
            },
            {
              id: "image",
              label: "Image",
              // Select the component once it's dropped
              select: true,
              // You can pass components as a JSON instead of a simple HTML string,
              // in this case we also use a defined component type `image`
              content: { type: "image" },
              // This triggers `active` event on dropped components and the `image`
              // reacts by opening the AssetManager
              activate: true,
            },
          ],
        },
        panels: {
          defaults: [],
        },
        projectData: {
          // pages: [
          //   {
          //     name: "homepage",
          //     content: `<div>Hello world</div>`,
          //   },
          // ],
        },
        container: "#editor-container",
        // storageManager: {
        //   type: "remote",
        //   options: {
        //     remote: {
        //       onStore: (data, editor) => {
        //         console.log("onStore", { data, editor });
        //         return data;
        //       },
        //       onLoad: (editor) => {
        //         return editor.data;
        //       },
        //     },
        //   },
        // },
        storageManager: {
          type: "remote",
        },
      }}
      onEditor={onEditor}
      plugins={[
        {
          id: "gjs-blocks-basic",
          src: "https://unpkg.com/grapesjs-blocks-basic",
        },
      ]}
    >
      {props.children}
    </GjsEditor>
  );
}
