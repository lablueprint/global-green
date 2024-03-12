import Roadmap from "../roadmapfunction";
import roadmapdata from "../roadmapdata"

const key = 'ocean-pollution'; // for example

const roadmap = roadmapdata[key];



function ocean_pollution() {
        return <Roadmap title={roadmap.title} steps={roadmap.steps} />;
}
export default ocean_pollution;