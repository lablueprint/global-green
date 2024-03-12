import Roadmap from "../roadmapfunction";
import roadmapdata from "../roadmapdata"

const key = 'introduction'; // for example

const roadmap = roadmapdata[key];



function introduction() {
        return <Roadmap title={roadmap.title} steps={roadmap.steps} />;
}
export default introduction;