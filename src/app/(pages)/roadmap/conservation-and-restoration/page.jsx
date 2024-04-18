import Roadmap from "../roadmapfunction";
import roadmapdata from "../roadmapdata"

const key = 'conservation-and-restoration'; // for example

const roadmap = roadmapdata[key];



function conservation_and_restoration() {
        return <Roadmap title={roadmap.title} steps={roadmap.steps} />;
}
export default conservation_and_restoration;