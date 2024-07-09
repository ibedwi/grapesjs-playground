"use client";

import GjsEditor, {
  BlocksProvider,
  Canvas,
  LayersProvider,
} from "@grapesjs/react";
import { GrapeJSProvider } from "@/features/editor/providers/GrapeJSProvider";
import { EditorHeader } from "@/features/editor/views/EditorHeader/EditorHeader";
import { SidebarManagerBlock } from "@/features/editor/views/SidebarManagerBlock/SidebarManagerBlock";
import { Box, Tabs } from "@radix-ui/themes";
import { SidebarLayerManager } from "@/features/editor/views/SidebarLayer/SidebarLayerManager";

export default function DefaultEditor() {
  return (
    <div className="h-screen flex flex-row items-stretch bg-red-100">
      <div id="editor-container" className="flex-1">
        <GrapeJSProvider>
          <div className="h-full flex flex-col">
            <EditorHeader />

            <div className="flex-grow flex flex-row bg-blue-100 items-stretch">
              <div className="w-[250px] border-r bg-white">
                <Tabs.Root defaultValue="block-manager">
                  <Tabs.List>
                    <Tabs.Trigger value="block-manager">Block</Tabs.Trigger>
                    <Tabs.Trigger value="documents">Pages</Tabs.Trigger>
                    <Tabs.Trigger value="layers">Layers</Tabs.Trigger>
                  </Tabs.List>

                  <Box pt="3">
                    <Tabs.Content value="block-manager">
                      <BlocksProvider>
                        {(props) => <SidebarManagerBlock {...props} />}
                      </BlocksProvider>
                    </Tabs.Content>

                    <Tabs.Content value="documents"></Tabs.Content>

                    <Tabs.Content value="layers">
                      <LayersProvider>
                        {(props) => <SidebarLayerManager {...props} />}
                      </LayersProvider>
                    </Tabs.Content>
                  </Box>
                </Tabs.Root>
              </div>
              <div className="flex-grow h-full">
                <Canvas />
              </div>
              <div className="w-[300px] border-l bg-white">Sytles</div>
            </div>
          </div>
        </GrapeJSProvider>
      </div>
    </div>
  );
}
