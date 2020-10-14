import Image from '../models/Images';

export default{
  render(image: Image){
    return{
      id: image.id,
      path: image.path,
      url: `http://localhost:3333/uploads/${image.path}`
    };
  },

  renderMany(image: Image[]){
    return image.map(image => this.render(image));
  }
}