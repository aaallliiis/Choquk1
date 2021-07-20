const controller = require('../../../../controller');
const Orientation=require('../../../../../../models/Orientation');

class OrientationController extends controller {
    async getAllOrientations({params:{id}},res,next){
        return this.success(await Orientation.getOrientations(id),res)
    }
}   


module.exports = new OrientationController();