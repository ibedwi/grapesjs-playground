export function EditorHeader() {
  return (
    <nav className="min-h-[50px] flex flex-row justify-between items-center bg-gray-100 px-4 py-2">
      <p>Editor</p>
      <section>
        <p>Project Name</p>
      </section>
      <section>
        <button>Save</button>
      </section>
    </nav>
  );
}
