const aquas = [
    {
      id: 1,
      title: "Motores",
      description: "Fuente principal de alimentación de una planta tratadora",
      rating: 2
    }
  ];
  
  class TypeRegister {
    // Método para agregar un registro
    static async addAqua(rating, title, description) {
      const newId = aquas.length + 1;
      const newAqua = {
        id: newId,
        title: title,
        description: description,
        rating: rating
      };
      aquas.push(newAqua);
      return true;
    }
  
    // Método para obtener todos los registros
    static async getAllAquas() {
      return aquas;
    }
  
    // Método para obtener un registro por ID
    static async getAquaById(id) {
      return aquas.find(aqua => aqua.id === id) || null;
    }
  
    // Método para actualizar un registro
    static async updateAqua(id, title, description, rating) {
      const index = aquas.findIndex(aqua => aqua.id === id);
      if (index === -1) {
        return false;
      }
      aquas[index] = {
        id: id,
        title: title,
        description: description,
        rating: rating
      };
      return true;
    }
  
    // Método para eliminar un registro
    static async deleteAqua(id) {
      const index = aquas.findIndex(aqua => aqua.id === id);
      if (index === -1) {
        return false;
      }
      aquas.splice(index, 1);
      return true;
    }
  }
  
  // Ejemplo de uso
  (async () => {
    // Agregar un registro
    await TypeRegister.addAqua(5, "New Aqua register", "A new hit aqua", 3);
  
    // Obtener todos los registros
    const allAquas = await TypeRegister.getAllAquas();
    console.log(allAquas);
  
    // Obtener un registro por ID
    const aqua = await TypeRegister.getAquaById(1);
    console.log(aqua);
  
    // Actualizar un registro
    const updated = await TypeRegister.updateAqua(1, "Updated Aqua register", "Updated description", 4);
    console.log(updated);
  
    // Eliminar un registro
    const deleted = await TypeRegister.deleteAqua(1);
    console.log(deleted);
  })
  ();
  