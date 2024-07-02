import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchTrashedNotes, restoreNote, permanentlyDeleteNote } from "@/api/notes";

const Trash = () => {
  const queryClient = useQueryClient();
  const { data: trashedNotes, error, isLoading } = useQuery({
    queryKey: ["trashedNotes"],
    queryFn: fetchTrashedNotes,
  });

  const restoreNoteMutation = useMutation(restoreNote, {
    onSuccess: () => {
      queryClient.invalidateQueries("trashedNotes");
      queryClient.invalidateQueries("notes");
    },
  });

  const permanentlyDeleteNoteMutation = useMutation(permanentlyDeleteNote, {
    onSuccess: () => {
      queryClient.invalidateQueries("trashedNotes");
    },
  });

  const handleRestoreNote = (id) => {
    restoreNoteMutation.mutate(id);
  };

  const handlePermanentlyDeleteNote = (id) => {
    permanentlyDeleteNoteMutation.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading trashed notes</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Trash</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trashedNotes.map((note) => (
          <Card key={note.id}>
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{note.content}</p>
              <div className="flex justify-end space-x-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRestoreNote(note.id)}
                >
                  Restore
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handlePermanentlyDeleteNote(note.id)}
                >
                  Delete Forever
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Trash;