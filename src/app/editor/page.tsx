"use client";

import { supabaseClient } from "@/utils/supabaseClient";
import { useEffect, useState } from "react";

export default function ListPage() {
  const [projectList, setProjectList] = useState<
    Array<{ id: string; name: string }>
  >([]);

  useEffect(() => {
    async function fetchProjects() {
      console.log("fetching projects");
      const { data, error } = await supabaseClient
        .from("projects")
        .select("id, name");
      if (error) {
        console.error(error);
      } else {
        console.log(data);
        if (data != null) {
          setProjectList(data);
        }
      }
    }

    fetchProjects();
  }, []);

  return (
    <div>
      <h1>Page</h1>
      <div>
        {projectList.map((project) => (
          <div key={project.id}>
            <a href={`/editor/${project.id}/edit`}>{project.name}</a>
          </div>
        ))}
      </div>
    </div>
  );
}
