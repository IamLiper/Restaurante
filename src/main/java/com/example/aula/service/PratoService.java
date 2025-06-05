package com.example.aula.service;

import com.example.aula.exception.IdJaCadastradoException;
import com.example.aula.model.Prato;
import com.example.aula.repository.PratoRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Service
@Validated
public class PratoService {
    private PratoRepository pratoRepository;

    public PratoService(PratoRepository pratoRepository) {
        this.pratoRepository = pratoRepository;
    }

    public List<Prato> listarTodos() {
        return pratoRepository.findAll();
    }

    public Prato salvar(@Valid Prato prato) {
        if (prato.getNome() != null && pratoRepository.findByNome(prato.getNome()).isPresent()) {
            throw new RuntimeException("Prato já cadastrado.");
        }

        return pratoRepository.save(prato);
    }

}
