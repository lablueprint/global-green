import Roadmap from "../roadmapfunction";
import roadmapdata from "../roadmap_data/roadmapdata"

const key = 'climate-change'; // for example

const roadmap = roadmapdata[key];



function climate_change() {
        return <Roadmap course={'course_4'} title={roadmap.title} steps={roadmap.steps} />;
}
export default climate_change;