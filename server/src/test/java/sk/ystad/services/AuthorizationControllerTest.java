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
import sk.ystad.common.data_structures.AuthResponse;
import sk.ystad.model.users.User;

import static org.mockito.Matchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@EnableAutoConfiguration(exclude = {
        org.springframework.boot.autoconfigure.security.SecurityAutoConfiguration.class
})
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ServerApplication.class)
@WebAppConfiguration
public class AuthorizationControllerTest {

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
    public void register() throws Exception {
        AuthResponse authResponse = new AuthResponse(true, null);

        String email = "test@fiit.stuba.sk";
        String name ="test";
        String surname ="test";
        String password ="test";

        Mockito.when(userService.registerUser(any(User.class))).thenReturn(authResponse);

        mvc.perform(post("/auth/register")
                .param("name", name)
                .param("surname", surname)
                .param("email", email)
                .param("password",password)
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("success").value(true))
        ;
    }


    @Test
    public void verifyToken() throws Exception {
        AuthResponse authResponse = new AuthResponse(true, null);
        String token = "stkvhVq4XwKvVCE6jiJqbqP8Y3mxKyfO";

        Mockito.when(userService.checkUser(token)).thenReturn(authResponse);

        mvc.perform(post("/auth/register/" + token)
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("success").value(true))
        ;
    }

}