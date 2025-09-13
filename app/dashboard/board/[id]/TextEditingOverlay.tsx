interface Props {
  editingText: { id: string; x: number; y: number; text: string } | null;
  setEditingText: React.Dispatch<any>;
  setShapes: React.Dispatch<any>;
}

export const TextEditorOverlay = ({
  editingText,
  setEditingText,
  setShapes,
}: Props) => {
  if (!editingText) return null;

  return (
    <textarea
      className="absolute bg-transparent border border-gray-400 text-white outline-none resize-none"
      style={{
        top: editingText.y,
        left: editingText.x,
        fontSize: "18px",
        color: "white",
      }}
      value={editingText.text}
      autoFocus
      onChange={(e) =>
        setEditingText((prev: any) =>
          prev ? { ...prev, text: e.target.value } : null
        )
      }
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setShapes((prev: any) =>
            prev.map((s: any) =>
              s.id === editingText.id
                ? {
                    ...s,
                    properties: { ...s.properties, text: editingText.text },
                  }
                : s
            )
          );
          setEditingText(null);
        }
      }}
      onBlur={() => {
        setShapes((prev: any) =>
          prev.map((s: any) =>
            s.id === editingText.id
              ? {
                  ...s,
                  properties: { ...s.properties, text: editingText.text },
                }
              : s
          )
        );
        setEditingText(null);
      }}
    />
  );
};
