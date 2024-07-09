"use client";

import { supabaseClient } from "@/utils/supabaseClient";
import { useEditor, useEditorMaybe } from "@grapesjs/react";
import { ProjectData } from "grapesjs";
import { useParams } from "next/navigation";
import { useEffect } from "react";

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
  const param = useParams();

  const onSave = async () => {
    if (editor) {
      const projectData = editor.getProjectData();
      await supabaseClient
        .from("projects")
        .upsert({
          id: (param.id as string) ?? null,
          name: "Project Name",
          project_data: projectData,
        })
        .then((result) => {
          alert("Project saved");
        });
    }
  };

  const onLoad = async () => {
    // if (editor) {
    //   await editor.load(template);
    // }
  };

  useEffect(() => {
    async function loadProject(id: string) {
      const { data, error } = await supabaseClient
        .from("projects")
        .select("project_data")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
      } else {
        if (data) {
          console.log(data);
          console.log("project_data", data.project_data);
          editor?.loadProjectData(data.project_data as ProjectData);
        }
      }
    }
    console.log(param);
    if (param.id !== null && editor !== null) {
      loadProject(param.id as string);
    }
  }, [param, editor]);

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
