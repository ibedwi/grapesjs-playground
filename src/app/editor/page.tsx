"use client";

import { supabaseClient } from "@/utils/supabaseClient";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ListPage() {
  const [projectList, setProjectList] = useState<
    Array<{ id: string; name: string; updated_at: string | null }>
  >([]);

  useEffect(() => {
    async function fetchProjects() {
      console.log("fetching projects");
      const { data, error } = await supabaseClient
        .from("projects")
        .select("id, name, updated_at");
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

  const router = useRouter();

  const onAddProject = async () => {
    const { data, error } = await supabaseClient
      .from("projects")
      .insert({ name: "New Project" })
      .select();

    if (error) {
      console.error(error);
    } else {
      console.log(data);
      router.push(`/editor/${data[0].id}/edit`);
    }
  };

  return (
    <div className="flex flex-col items-stretch max-w-[70%] mx-auto py-4 gap-3">
      <div>
        <Button onClick={onAddProject}>Add new project</Button>
      </div>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Project Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Last Updated</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {projectList.map((project) => (
            <Table.Row key={project.id}>
              <Table.RowHeaderCell>{project.name}</Table.RowHeaderCell>
              <Table.Cell>{project.updated_at ?? "-"}</Table.Cell>
              <Table.Cell>
                <Link href={`/editor/${project.id}/edit`}>
                  <Button>Edit</Button>
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
