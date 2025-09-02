import livros from "../models/Livro.js";

class LivroController {
    
    static listarLivros = async (req, res) => {
        try {
            const listaLivros = await livros.find();
            res.status(200).json(listaLivros);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static listarLivrosPorId = async (req, res) => {
        const id = req.params.id;
        try {
            const livro = await livros.findById(id);
            if (livro) {
                res.status(200).json(livro);
            } else {
                res.status(404).send({ message: 'Livro não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static cadastrarLivro = async (req, res) => {
        try {
            const livro = new livros(req.body);
            await livro.save();
            res.status(201).send(livro.toJSON());
        } catch (err) {
            res.status(500).send({ message: `${err.message} - falha ao cadastrar livro.` });
        }
    }

    static atualizarLivro = async (req, res) => {
        const id = req.params.id;
        try {
            const livro = await livros.findByIdAndUpdate(id, { $set: req.body });
            if (livro) {
                res.status(200).send({ message: 'Livro atualizado com sucesso' });
            } else {
                res.status(404).send({ message: 'Livro não encontrado' });  
            }
        }catch (err) {
            res.status(500).send({ message: err.message }); 
        }
    }

    static excluirLivro = async (req, res) => {
        const id = req.params.id;
        try {
            const livro = await livros.findByIdAndDelete(id);
            if (livro) {
                res.status(200).send({ message: 'Livro removido com sucesso' });
            } else {
                res.status(404).send({ message: 'Livro não encontrado' });
            }
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    }
}

export default LivroController;