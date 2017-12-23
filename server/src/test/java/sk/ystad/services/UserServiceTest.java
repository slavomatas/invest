package sk.ystad.services;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import sk.ystad.ServerApplication;
import sk.ystad.model.users.repositores.UserRepository;
import sk.ystad.model.users.database_objects.User;

import java.security.Principal;

import static org.junit.Assert.*;
import static org.mockito.Matchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@EnableAutoConfiguration(exclude = {
        org.springframework.boot.autoconfigure.security.SecurityAutoConfiguration.class
})
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ServerApplication.class)
@WebAppConfiguration
public class UserServiceTest {
    private MockMvc mvc;

    @Autowired
    private WebApplicationContext wac;

    @MockBean
    UserService userService;

    @Before
    public void setup() {
        this.mvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
    }

    @Test
    public void getUser() throws Exception {
        User user = new User();
        user.setName("test");
        user.setId(1L);
        user.setUsername("test@test.com");
        user.setRegistrationConfirmed(true);
        user.setEmail("test@test.com");

        Mockito.when(userService.getUser(any(Principal.class))).thenReturn(user);

        mvc.perform(get("/v1/user")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("id").value(1))
                .andExpect(jsonPath("username").value("test@test.com"))
                .andExpect(jsonPath("name").value("test"))
                .andExpect(jsonPath("email").value("test@test.com"))
                .andExpect(jsonPath("registrationConfirmed").value(true))
                ;
    }

}