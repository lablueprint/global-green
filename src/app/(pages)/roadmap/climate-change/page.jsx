import Roadmap from "../roadmapfunction";
import roadmapdata from "../roadmapdata"

const key = 'climate-change'; // for example

const roadmap = roadmapdata[key];



function climate_change() {
        return <Roadmap title={roadmap.title} steps={roadmap.steps} />;
}
export default climate_change;