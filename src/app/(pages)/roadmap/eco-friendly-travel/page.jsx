import Roadmap from "../roadmapfunction";
import roadmapdata from "../roadmap_data/roadmapdata"

const key = 'eco-friendly-travel'; // for example

const roadmap = roadmapdata[key];



function eco_friendly_travel() {
        return <Roadmap course={'course_5'} title={roadmap.title} steps={roadmap.steps} />;
}
export default eco_friendly_travel;