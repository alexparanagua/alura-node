import autores from "../models/Autor.js";

class AutorController {
    
    static listarAutores = async (req, res) => {
        try {
            const listaAutores = await autores.find();
            res.status(200).json(listaAutores);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static listarAutoresPorId = async (req, res) => {
        const id = req.params.id;
        try {
            const autor = await autores.findById(id);
            if (autor) {
                res.status(200).json(autor);
            } else {
                res.status(404).send({ message: 'Autor não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static cadastrarAutor = async (req, res) => {
        try {
            const autor = new autores(req.body);
            await autor.save();
            res.status(201).send(autor.toJSON());
        } catch (err) {
            res.status(500).send({ message: `${err.message} - falha ao cadastrar autor.` });
        }
    }

    static atualizarAutor = async (req, res) => {
        const id = req.params.id;
        try {
            const autor = await autores.findByIdAndUpdate(id, { $set: req.body });
            if (autor) {
                res.status(200).send({ message: 'Autor atualizado com sucesso' });
            } else {
                res.status(404).send({ message: 'Autor não encontrado' });  
            }
        }catch (err) {
            res.status(500).send({ message: err.message }); 
        }
    }

    static excluirAutor = async (req, res) => {
        const id = req.params.id;
        try {
            const autor = await autores.findByIdAndDelete(id);
            if (autor) {
                res.status(200).send({ message: 'Autor removido com sucesso' });
            } else {
                res.status(404).send({ message: 'Autor não encontrado' });
            }
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    }
}

export default AutorController;