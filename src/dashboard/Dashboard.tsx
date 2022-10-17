import { useNotes, useTagsObj } from "@/app/world/hooks";
import Navbar from "@/components/Navbar";
import NoteList from "../components/NoteList";

const Dashboard: React.FC = () => {
  const notes = useNotes();
  const tagsObj = useTagsObj();
  
  return (
    <div>
      <Navbar />
      <NoteList notes={notes} tagsObj={tagsObj} />
    </div>
  );
};

export default Dashboard;
