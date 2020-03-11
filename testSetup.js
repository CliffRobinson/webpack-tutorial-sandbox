import enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

enzyme.configure({
    adapter: new Adapter()
});

global.toJson = toJson;