import Roadmap from "../roadmapfunction";
import roadmapdata from "../roadmapdata"

const key = 'sustainability-labs'; // for example

const roadmap = roadmapdata[key];



function sustainability_labs() {
        return <Roadmap title={roadmap.title} steps={roadmap.steps} />;
}
export default sustainability_labs;