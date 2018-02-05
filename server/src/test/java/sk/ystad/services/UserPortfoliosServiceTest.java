package sk.ystad.services;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import sk.ystad.ServerApplication;
import sk.ystad.controllers.PortfolioController;
import sk.ystad.model.users.portfolios.Portfolio;
import sk.ystad.model.users.User;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;


import static org.mockito.Matchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;



@RunWith(SpringRunner.class)
@SpringBootTest(classes = ServerApplication.class)
@WebAppConfiguration
public class UserPortfoliosServiceTest {

    private MockMvc mvc;

    @MockBean
    private PortfolioController userPortfoliosService;

    @Autowired
    private WebApplicationContext wac;

    @Before
    public void setup() {
        this.mvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
    }


    @Test
    public void returnPortfoliosForGivenUser() throws Exception {
        List<Portfolio> testPortfolios = new ArrayList<>();
        User user = new User(3L);
        testPortfolios.add(new Portfolio(1L, "Portfolio1", user));
        testPortfolios.add(new Portfolio(2L, "Portfolio2", user));
        user.setPortfolios(testPortfolios);


        Mockito.when(
                userPortfoliosService.findByUserId(any(Principal.class))).thenReturn(testPortfolios);


        mvc.perform(get("/v1/user/portfolios")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].name").value("Portfolio1"))
                .andExpect(jsonPath("$[1].id").value(2))
                .andExpect(jsonPath("$[1].name").value("Portfolio2"));


    }
}
