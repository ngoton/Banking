package com.hcmus.banking.platform.core.application.admin;

import com.hcmus.banking.platform.core.application.info.InfoService;
import com.hcmus.banking.platform.domain.exception.NotFoundException;
import com.hcmus.banking.platform.domain.info.Info;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class InfoUseCaseService {
    private final InfoService infoService;

    @Transactional(readOnly = true)
    public Info findById(Long id){
        Info info = infoService.findById(id);
        if (info.isEmpty()){
            throw new NotFoundException();
        }
        return info;
    }

    @Transactional
    public void create(Info info){
        infoService.create(info);
    }

    @Transactional
    public void update(Info info){
        Info oldInfo = infoService.findById(info.getId());
        if (oldInfo.isEmpty()){
            throw new NotFoundException();
        }
        infoService.update(oldInfo, info);
    }

    @Transactional
    public void delete(Long id){
        Info info = infoService.findById(id);
        if (info.isEmpty()){
            throw new NotFoundException();
        }
        infoService.delete(info);
    }
}
