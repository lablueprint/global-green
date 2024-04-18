import Roadmap from "../roadmapfunction";
import roadmapdata from "../roadmapdata"

const key = 'plastic-and-recycling'; // for example

const roadmap = roadmapdata[key];



function plastic_and_recycling() {
        return <Roadmap title={roadmap.title} steps={roadmap.steps} />;
}
export default plastic_and_recycling;