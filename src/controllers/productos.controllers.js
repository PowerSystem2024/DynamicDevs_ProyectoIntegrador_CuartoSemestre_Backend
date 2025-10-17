import Producto from "../database/models/producto.js";

export const listarProductos = async (req, res) => {
  try {
    //Pedirle a la bd los productos
    const productos = await Producto.find();
    //Enviar la respuesta al front con los productos
    res.status(200).json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al listar los productos" });
  }
};

export const obtenerProducto = async (req, res) => {
  try {
    //Extraer el id unico o parametro del request
    console.log(req.params.id);
    //Pedimos a la base de datos buscar ese producto
    const productoBuscado = await Producto.findById(req.params.id);
    //Quiero saber si productoBuscado es null
    if(!productoBuscado){
     return  res.status(400).json({mensaje: `El producto con id: ${req.params.id} no existe`})
    }
    //Responder al front con el producto buscado
    res.status(200).json(productoBuscado);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error al obtener el producto" });
  }
};

export const crearProducto = async (req, res) => {
  try {
    //Validar los datos del producto del body
    //Le pedimos a la BD crear el producto
    console.log(req.body);
    const productoNuevo = new Producto(req.body);
    await productoNuevo.save(); //Aqui se guarda en la bd
    //Enviar la respuesta al front
    res
      .status(201)
      .json({ mensaje: "Producto creado con exito", producto: productoNuevo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear el producto" });
  }
};

export const editarProducto = async (req, res) => {
  try {
    //Extraer el id del body
    //Validamos los datos del body
    //Pedimos a  la bd editar el producto
      const productoBuscado = await Producto.findById(req.params.id);
    //Quiero saber si productoBuscado es null
    if(!productoBuscado){
     return  res.status(400).json({mensaje: `El producto con id: ${req.params.id} no existe`})
    }
   const productoEditado = await Producto.findByIdAndUpdate(req.params.id, req.body, {new: true});
    //Responder al frontend con un codigo exitoso
    res.status(200).json({mensaje: "Producto editado con exito"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear el producto" });
  }
};

export const borrarProducto = async (req, res) => {

  try{
    //Verificar si existe el id
    const productoBuscado = await Producto.findById(req.params.id);
    //Quiero saber si productoBuscado es null
    if(!productoBuscado){
     return  res.status(400).json({mensaje: `El producto con id: ${req.params.id} no existe`})
    }
    //Eliminar el producto de la BD (Documento)
    await Producto.findByIdAndDelete(req.params.id);
    //Responder al frontend
    res.status(200).json({mensaje: "Producto eliminado con exito"})
  }catch(error){
    console.error(error);
    res.status(500).json({ mensaje: "Error al borrar el producto" });
  }
}