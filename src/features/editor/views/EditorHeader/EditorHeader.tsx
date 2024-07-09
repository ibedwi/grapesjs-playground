"use client";

import { supabaseClient } from "@/utils/supabaseClient";
import { useEditor, useEditorMaybe } from "@grapesjs/react";

const template = {
  assets: [],
  styles: [],
  pages: [
    {
      name: "homepage",
      frames: [
        {
          component: {
            type: "wrapper",
            stylable: [
              "background",
              "background-color",
              "background-image",
              "background-repeat",
              "background-attachment",
              "background-position",
              "background-size",
            ],
            attributes: {
              id: "ig0z",
            },
            components: [
              {
                tagName: "section",
                components: [
                  {
                    tagName: "h1",
                    type: "text",
                    attributes: {
                      id: "iewd",
                    },
                    components: [
                      {
                        type: "textnode",
                        content: "Project heading",
                      },
                    ],
                  },
                  {
                    type: "text",
                    components: [
                      {
                        type: "textnode",
                        content:
                          "This is just a Lorem text: Lorem ipsum dolor sit amet",
                      },
                    ],
                  },
                ],
              },
            ],
            head: {
              type: "head",
            },
            docEl: {
              tagName: "html",
            },
          },
          id: "OR08CzwZTPmZDqUN",
        },
      ],
      content: "<div>Hello world</div>",
      id: "JstiS57LvN6FuXLs",
    },
  ],
  symbols: [],
};

export function EditorHeader() {
  const editor = useEditorMaybe();

  const onSave = async () => {
    if (editor) {
      const projectData = editor.getProjectData();
      await supabaseClient
        .from("projects")
        .upsert({
          name: "Project Name",
          project_data: projectData,
        })
        .then((result) => {
          alert("Project saved");
        });
    }
  };

  const onLoad = async () => {
    if (editor) {
      await editor.load(template);
    }
  };

  return (
    <nav className="min-h-[50px] flex flex-row justify-between items-center bg-gray-100 px-4 py-2">
      <p>Editor</p>
      <section>
        <p>Project Name</p>
      </section>
      <section className="flex flex-row gap-3">
        <button onClick={onLoad}>Load</button>
        <button onClick={onSave}>Save</button>
      </section>
    </nav>
  );
}
