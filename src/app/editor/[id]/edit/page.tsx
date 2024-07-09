"use client";

import grapesjs, {
  CanvasConfig,
  Editor,
  EditorConfig,
  StorageManagerConfig,
} from "grapesjs";
import GjsEditor, { BlocksProvider, Canvas } from "@grapesjs/react";
import { GrapeJSProvider } from "@/features/editor/providers/GrapejsProvider";
import { EditorHeader } from "@/features/editor/views/EditorHeader/EditorHeader";
import { SidebarManagerBlock } from "@/features/editor/views/SidebarManagerBlock/SidebarManagerBlock";
// import { BlocksManager } from "@/ui/editors/BlocksManager/BlocksManager";
// import { AppShell, Button, Flex, Group, Text } from "@mantine/core";

export default function DefaultEditor() {
  const onEditor = (editor: Editor) => {
    console.log("Editor loaded", { editor });
  };

  const storageManager: StorageManagerConfig = {
    id: "supabase-storage",
    type: "remote",
    autosave: false,
    onStore: (data, editor) => {
      console.log("onStore", { data, editor });
      return data;
    },
  };
  const canvasConfig: CanvasConfig = {};
  return (
    <div className="h-screen flex flex-row items-stretch bg-red-100">
      <div id="editor-container" className="flex-1">
        <GrapeJSProvider>
          <div className="h-full flex flex-col">
            <EditorHeader />

            <div className="flex-grow flex flex-row bg-blue-100 items-stretch">
              <div className="w-[250px] border-r bg-white">
                <BlocksProvider>
                  {(props) => <SidebarManagerBlock {...props} />}
                </BlocksProvider>
              </div>
              <div className="flex-grow h-full">
                <Canvas />
              </div>
            </div>
          </div>
        </GrapeJSProvider>
      </div>
    </div>
  );
}
