import Roadmap from "../roadmap";
import roadmapdata from "../roadmap_data/roadmapdata"

const key = 'ocean-pollution'; // for example

const roadmap = roadmapdata[key];



function ocean_pollution() {
        return <Roadmap course={'course_6'} title={roadmap.title} steps={roadmap.steps} />;
}
export default ocean_pollution;