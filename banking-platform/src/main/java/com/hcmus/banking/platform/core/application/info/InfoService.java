package com.hcmus.banking.platform.core.application.info;

import com.hcmus.banking.platform.core.infrastructure.datasource.info.InfoRepository;
import com.hcmus.banking.platform.domain.info.Info;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InfoService {
    private final InfoRepository infoRepository;

    public Info findById(Long id){
        return infoRepository.findById(id).orElse(Info.ofEmpty());
    }

    public Info findByCustomerCode(String code){
        return infoRepository.findByCustomerCode(code).orElse(Info.ofEmpty());
    }

    public void create(Info info){
        infoRepository.save(info);
    }

    public void update(Info oldInfo, Info info){
        oldInfo.setFirstName(info.getFirstName());
        oldInfo.setLastName(info.getLastName());
        oldInfo.setBirthDate(info.getBirthDate());
        oldInfo.setGender(info.getGender());
        oldInfo.setPhone(info.getPhone());
        oldInfo.setAddress(info.getAddress());
        infoRepository.save(oldInfo);
    }

    public void delete(Info info){
        infoRepository.delete(info);
    }
}
