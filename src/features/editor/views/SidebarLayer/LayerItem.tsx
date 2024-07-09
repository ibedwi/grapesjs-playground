import * as React from "react";
import { useEditor } from "@grapesjs/react";
import type { Component } from "grapesjs";
import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/components/utils";
import {
  FaChevronDown,
  FaChevronRight,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { IconButton } from "@radix-ui/themes";

export declare interface LayerItemProps
  extends React.HTMLProps<HTMLDivElement> {
  component: Component;
  level: number;
  draggingCmp?: Component;
  dragParent?: Component;
}

// Example: https://github.com/GrapesJS/react/blob/main/packages/grapesjs-react-app/src/examples/components/LayerItem.tsx
export function LayerItem({
  component,
  draggingCmp,
  dragParent,
  ...props
}: LayerItemProps) {
  const editor = useEditor();
  const { Layers } = editor;
  const layerRef = useRef<HTMLDivElement>(null);
  const [layerData, setLayerData] = useState(Layers.getLayerData(component));
  const { open, selected, hovered, components, visible, name } = layerData;

  const componentsIds = components.map((cmp) => cmp.getId());
  const cmpHash = componentsIds.join("-");

  const isDragging = draggingCmp === component;
  const level = props.level + 1;
  const isHovered = hovered || dragParent === component;

  useEffect(() => {
    level === 0 && setLayerData(Layers.getLayerData(component));
    if (layerRef.current) {
      (layerRef.current as any).__cmp = component;
    }
  }, [component]);

  useEffect(() => {
    const up = (cmp: Component) => {
      cmp === component && setLayerData(Layers.getLayerData(cmp));
    };
    const ev = Layers.events.component;
    editor.on(ev, up);

    return () => {
      editor.off(ev, up);
    };
  }, [editor, Layers, component]);

  const childLayers = useMemo(() => {
    return components.map((cmp) => (
      <LayerItem
        key={cmp.getId()}
        component={cmp}
        level={level}
        draggingCmp={draggingCmp}
        dragParent={dragParent}
      />
    ));
  }, [cmpHash, draggingCmp, dragParent]);

  const toggleOpen = (ev: MouseEvent) => {
    ev.stopPropagation();
    Layers.setLayerData(component, { open: !open });
  };

  const toggleVisibility = (ev: MouseEvent) => {
    ev.stopPropagation();
    Layers.setLayerData(component, { visible: !visible });
  };

  const select = (event: MouseEvent) => {
    event.stopPropagation();
    Layers.setLayerData(component, { selected: true }, { event });
  };

  const hover = (hovered: boolean) => {
    if (!hovered || !draggingCmp) {
      Layers.setLayerData(component, { hovered });
    }
  };

  return (
    <div
      className={cn(
        "layer-item flex flex-col",
        selected && "bg-gray-300",
        (!visible || isDragging) && "opacity-50"
      )}
    >
      <div
        onClick={select}
        onMouseEnter={() => hover(true)}
        onMouseLeave={() => hover(false)}
        className="group max-w-full"
        data-layer-item
        ref={layerRef}
      >
        <div
          className={cn(
            "flex items-center p-1 pr-2  gap-1",
            isHovered && "bg-gray-100",
            selected && "bg-gray-200"
          )}
        >
          <IconButton
            style={{
              marginLeft: `${level * 10}px`,
              opacity: components.length ? 1 : 0,
              cursor: components.length ? "pointer" : "default",
            }}
            variant="ghost"
            onClick={toggleOpen}
            size={"1"}
          >
            {open ? <FaChevronDown /> : <FaChevronRight />}
          </IconButton>
          <div className="truncate flex-grow max-w-full">{name}</div>
          <IconButton
            className={cn(
              "group-hover:opacity-100 cursor-pointer",
              visible ? "opacity-0" : "opacity-100"
            )}
            variant="ghost"
            onClick={toggleVisibility}
            size={"1"}
          >
            {visible ? <FaEye /> : <FaEyeSlash />}
          </IconButton>
        </div>
      </div>
      {!!(open && components.length) && (
        <div className={cn("max-w-full", !open && "hidden")}>{childLayers}</div>
      )}
    </div>
  );
}
