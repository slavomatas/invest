package sk.ystad.common.loaders.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sk.ystad.common.data_structures.AuthResponse;
import sk.ystad.common.loaders.LoaderResult;
import sk.ystad.common.loaders.security.SecurityLoader;
import sk.ystad.common.loaders.services.LoaderService;
import sk.ystad.repositories.securities.SecurityRepository;

@RestController
@RequestMapping("/loaders")
public class LoadersController {

    private final SecurityRepository securityRepository;
    private final LoaderService loaderService;

    @Autowired
    public LoadersController(SecurityRepository securityRepository, LoaderService loaderService) {
        this.securityRepository = securityRepository;
        this.loaderService = loaderService;
    }

    @RequestMapping("/load_etfs")
    public LoaderResult loadEtfsData() {
        return new SecurityLoader().loadEtfs(securityRepository);
    }

    @RequestMapping("/testing_data")
    public AuthResponse loadData() {
        try {
            loaderService.loadTestingData();
            return new AuthResponse(true, "Data has been loaded");
        } catch (NullPointerException | IndexOutOfBoundsException e) {
            return new AuthResponse(false, "Datal loader crashed " + e.getMessage());
        }
    }

    @RequestMapping("/model_portfolios")
    public AuthResponse loadModelPortfolios() {
        int numberOfInsertedPortfolios = loaderService.loadModelPortfolios();
        return new AuthResponse(true, numberOfInsertedPortfolios + " portfolios has been added to database");
    }
}
