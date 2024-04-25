import Roadmap from "../roadmapfunction";
import roadmapdata from "../roadmap_data/roadmapdata"

const key = 'plastic-and-recycling'; // for example

const roadmap = roadmapdata[key];



function plastic_and_recycling() {
        return <Roadmap course={'course_1'} title={roadmap.title} steps={roadmap.steps} />;
}
export default plastic_and_recycling;