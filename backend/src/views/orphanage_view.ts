import Orphanages from '../models/Orphanages';
import Images from './images_view';

export default{
  render(orphanage: Orphanages){
    return{
      id: orphanage.id,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      open_on_weekends: orphanage.open_on_weekends,
      images: Images.renderMany(orphanage.images)
    };
  },

  renderMany(orphanages: Orphanages[]){
    return orphanages.map(orphanage => this.render(orphanage));
  }
}