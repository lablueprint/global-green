import Roadmap from "../roadmapfunction";
import roadmapdata from "../roadmap_data/roadmapdata"

const key = 'sustainability-labs'; // for example

const roadmap = roadmapdata[key];



function sustainability_labs() {
        return <Roadmap course={'course_2'} title={roadmap.title} steps={roadmap.steps} />;
}
export default sustainability_labs;